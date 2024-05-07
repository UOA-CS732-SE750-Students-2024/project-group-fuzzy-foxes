import * as dotenv from "dotenv";
dotenv.config();

import axios from 'axios';
import mongoose from "mongoose";
import { GoogleTrend } from "./googleTrendSchema.js";
import { HistoryToday } from "./historyinTodaySchema.js";
import { TwitterTrend } from "./twitterTrendSchema.js";
import { aiNews } from "./ainewsSchema.js";
import { NewsDataIo } from "./newsdataIOSchema.js";
import { basketballGames } from "./basketballSchema.js";
var mongodb_url = "mongodb://127.0.0.1:27017/hotspot";

// This is a standalone program which will populate the database with initial data.
async function run() {
  mongoose.connect(mongodb_url);
  const database = mongoose.connection;
  database.on('error', (error) => {
    console.log(error)
})

  database.once('connected', () => {
    console.log('Database Connected');

    // Do a get after start
    getAllNews();
    // Then do one get every 24 hours
  //setScheduledTask(4, 0, getAllNews);

})

}

function getTodayInHistory() {
  axios.get('https://today-in-history.p.rapidapi.com/thisday', 
  {
      headers: { 
          'X-RapidAPI-Key': 'd952733307msh6f314aa3def483cp1d0f0ajsn31a88a154bdc',
          'X-RapidAPI-Host': 'today-in-history.p.rapidapi.com'
       }
  })
      .then( response => {
          console.log(response.data);
          const result = response.data.article;
          const spot = new HistoryToday({
              source: 'Today In History',
              title: result.title,
              url: result.url
          })
          spot.save();
      })
}

function getGoogleTrend() {
  axios.get('https://serpapi.com/search.json?engine=google_trends_trending_now&frequency=realtime&geo=US&cat=all&api_key=949a8410438c663d34685340398a4081c9d37595a064129972a2616c17152dc8')
      .then(function (response) {
          const data = response.data.realtime_searches
          console.log(response.data.realtime_searches);
          data.forEach(item => {
              item.articles.forEach(
                  article => {
                      const spot = new GoogleTrend({
                          source: 'Google trend',
                          title: article.title,
                          url: article.link,
                          thumbnail: article.thumbnail
                      })
                      spot.save();
                  }
              )
          });

      })
      .catch(function (error) {
          console.log(error);
      })
}

function getTwitterTrend() {
    let yourDate = new Date();
    yourDate.toISOString().split("T")[0];
    axios
      .post(
        "https://twitter-trends5.p.rapidapi.com/twitter/request.php",
        {
          woeid: "23424977",
        },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key":
              "d952733307msh6f314aa3def483cp1d0f0ajsn31a88a154bdc",
            "X-RapidAPI-Host": "twitter-trends5.p.rapidapi.com",
          },
        }
      )
      .then((response) => {
        const results = response.data.trends;
        // console.log(results);
        for (let i = 0; i < 20; i++) {
          var index = i + "";
          var result = results[index];
          const spot = new TwitterTrend({
            source: "Twitter Trend",
            title: result.name.replace("#", ""),
            url: "https://twitter.com/search?q=" + result.name.replace("#", ""),
            domainContext: result.domainContext,
          });
          spot.save();
        }
      });
  }

function getaiNews() {
    axios.get('https://ai-news-api.p.rapidapi.com/news',
        {
        headers: { 
            'X-RapidAPI-Key': 'd952733307msh6f314aa3def483cp1d0f0ajsn31a88a154bdc',
            'X-RapidAPI-Host': 'ai-news-api.p.rapidapi.com'
         }
        })
        .then( response => {
            console.log(response.data);
            const results = response.data;

            var count = 0;
            results.forEach(result => {
                if (count > 20) {
                    return;
                }
                const spot = new aiNews({
                    source: 'ai News',
                    title: result.title,
                    url: result.url
                })
                count++;
                spot.save();
            });

        })
}

function getNewsDataIo() {
    axios.get('https://newsdata.io/api/1/news?apikey=pub_39750b97c29623afc46fc8456bb9e02732a8a&country=nz')
        .then(function (response) {
            const data = response.data.results;
            console.log(response.data.results);
            data.forEach(news => {
                    const spot = new NewsDataIo({
                        source: 'NewsDataIo',
                        title: news.title,
                        url: news.link,
                        pubDate: news.pubDate
                    })
                    spot.save();
                    }
                )
            })
        .catch(function (error) {
            console.log(error);
        })
  }
  // Excute tasks regularly
function setScheduledTask(hour, minute, callTask) {
  let taskTime = new Date();
  taskTime.setHours(hour);
  taskTime.setMinutes(minute);
  let timeDiff = taskTime.getTime() - (new Date()).getTime(); // get time diff
  timeDiff = timeDiff > 0 ? timeDiff : (timeDiff + 24 * 60 * 60 * 1000);
  setTimeout(function() {
      callTask(); 
      setInterval(callTask, 24 * 60 * 60 * 1000); // 24 hours
  }, timeDiff); 
}

function getBasketballGames() {
  const currentDate = new Date().toISOString().split('T')[0];
  axios.get('https://api-basketball.p.rapidapi.com/games',
    {
      params: {
        timezone: 'Pacific/Auckland',
        season: '2023-2024',
        league: '12',
        date: currentDate
      },
      headers: {
        'X-RapidAPI-Key': '7fc5fae20cmsha2e70afcb71644dp13f69djsn471b97c2054c',
        'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
      }
    })
    .then(function (response) {
      const data = response.data.response
      console.log(response.data.response);
      data.forEach(item => {
        const spot = new basketballGames({
          source: 'Basketball Games',
          matchTime: item.date,
          status: item.status.long,

          team1Logo: item.teams.home.logo,
          team2Logo: item.teams.away.logo,
          team1: item.teams.home.name,
          team2: item.teams.away.name,
          score1: item.scores.home.total,
          score2: item.scores.away.total
        })
        spot.save();
      })
    })
    .catch(function (error) {
      console.log(error);
    })
}




  
function getAllNews() {
  getGoogleTrend();
  getTodayInHistory();
  getTwitterTrend();
  getaiNews();
  getNewsDataIo()
  getBasketballGames()
}
run();
