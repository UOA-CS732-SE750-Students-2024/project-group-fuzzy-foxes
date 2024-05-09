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

const mongodb_url = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/hotspot";

// This is a standalone program which will populate the database with initial data.
export async function run() {
  //mongoose.connect(mongodb_url);
  try {
    // 连接到 MongoDB Atlas
    await mongoose.connect(mongodb_url);
    console.log('MongoDB connection successful');

    // 连接成功后执行操作
    await getAllNews();
    

  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}


function getTodayInHistory() {
  axios.get('https://today-in-history.p.rapidapi.com/thisday', 
  {
      headers: { 
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY_HISTORY,
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
  axios.get('https://serpapi.com/search.json?engine=google_trends_trending_now&frequency=realtime&geo=US&cat=all&api_key='+process.env.API_KEY_GOOGLE_TRENDS)
      .then(function (response) {
        const data = response.data.realtime_searches;
        console.log(data);
        let count = 0;  
        const maxArticles = 20; 

        for (const item of data) {
            if (item.articles.length > 0 && count < maxArticles) { 
                const firstArticle = item.articles[0]; 

                const spot = new GoogleTrend({
                    source: 'Google trend',
                    title: firstArticle.title,
                    url: firstArticle.link,
                    thumbnail: firstArticle.thumbnail
                });
                spot.save(); 
                count++; 
                
                if (count >= maxArticles) break; 
            }
        }

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
            "X-RapidAPI-Key":process.env.RAPIDAPI_KEY_TWITTER,
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
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY_AI_NEWS,
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
    axios.get('https://newsdata.io/api/1/news?apikey='+process.env.API_KEY_NEWS_DATA_IO)
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
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY_BASKETBALL,
        'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
      }
    })
    .then(function (response) {
      const data = response.data.response
      console.log(response.data.response);
      data.forEach(item => {
        const spot = new basketballGames({
          source: 'Basketball Games',
          matchTime: item.date.slice(0, item.date.indexOf('+')).replace('T', ' '),
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
