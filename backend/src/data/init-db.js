import * as dotenv from "dotenv";
dotenv.config();

import axios from 'axios';
import mongoose from "mongoose";
import { GoogleTrend } from "./googleTrendSchema.js";
import { HistoryToday } from "./historyinTodaySchema.js";
import { TodayWeather } from "./TodayWeatherSchema.js";
import { TwitterTrend } from "./twitterTrendSchema.js";
import { aiNews } from "./ainewsSchema.js";
import { NewsDataIo } from "./newsdataIOSchema.js";
import { User } from "../data/userInfoSchema.js";
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

function getTodayWeather(){
    axios.get('https://the-weather-api.p.rapidapi.com/api/weather/auckland', 
  {
      headers: { 
        'X-RapidAPI-Key': 'c5d7516ffamshd606a9ff318bad1p1f46bajsnabd2700a6eb6',
        'X-RapidAPI-Host': 'the-weather-api.p.rapidapi.com'
       }
  })
      .then( response => {
          console.log(response.data.data);
          const result = response.data.data
          const spot = new TodayWeather({
              source: 'Today Weather',
              city: result.city,
              current_weather: result.current_weather,
              bg_image: result.bg_image,
              temp: result.temp
          })
          spot.save();
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





  
function getAllNews() {
  getGoogleTrend();
  getTodayInHistory();
  getTwitterTrend();
  getTodayWeather();
  getaiNews();
  getNewsDataIo()
}
run();
