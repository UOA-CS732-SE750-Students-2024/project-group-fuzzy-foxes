import * as dotenv from "dotenv";
dotenv.config({path:'../../.env'});

import axios from 'axios';
import mongoose from "mongoose";
import { GoogleTrend } from "./googleTrendSchema.js";
import { HistoryToday } from "./historyinTodaySchema.js";
import { TwitterTrend } from "./twitterTrendSchema.js";
import { aiNews } from "./ainewsSchema.js";
import { NewsDataIo } from "./newsdataIOSchema.js";
import { basketballGames } from "./basketballSchema.js";
import { User } from "../data/userInfoSchema.js";

//connect to DB
const mongodb_url = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/hotspot";
mongoose.connect(mongodb_url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Generic methods for fetching and saving data
async function fetchAndSave(url, headers, Model, transform) {
  try {
    const response = await axios.get(url, { headers });
    const data = transform(response.data);
    await Model.create(data);
    console.log(`${Model.modelName} data saved.`);
  } catch (error) {
    console.error(`Failed to fetch or save ${Model.modelName}:`, error);
  }
}

// Transform functions for each API
const transformHistoryToday = data => ({
  source: 'Today In History',
  title: data.article.title,
  url: data.article.url
});

const transformGoogleTrend = data => data.realtime_searches.map(item => ({
  source: 'Google Trend',
  title: item.articles.title,
  url: item.articles.link,
  thumbnail: item.articles.thumbnail
}));

const transformTwitterTrend = data => data.trends.map(trend => ({
  source: "Twitter Trend",
  title: trend.name.replace("#", ""),
  url: "https://twitter.com/search?q=" + encodeURIComponent(trend.name),
  domainContext: trend.domainContext
}));

const transformAiNews = data => data.map(item => ({
  source: 'ai News',
  title: item.title,
  url: item.url
}));

const transformNewsDataIo = data => data.results.map(item => ({
  source: 'NewsDataIo',
  title: item.title,
  url: item.link,
  pubDate: item.pubDate
}));

const transformBasketballGames = data => data.response.map(item => ({
  source: 'Basketball Games',
  matchTime: item.date,
  status: item.status.long,
  team1Logo: item.teams.home.logo,
  team2Logo: item.teams.away.logo,
  team1: item.teams.home.name,
  team2: item.teams.away.name,
  score1: item.scores.home.total,
  score2: item.scores.away.total
}));


// Retrieve and save data for all sources
async function run() {
  try {
      await db.once('open', () => {
          console.log('Database Connected');
      });

      // History Today
      await fetchAndSave(
          'https://today-in-history.p.rapidapi.com/thisday',
          { 'X-RapidAPI-Key': process.env.RAPIDAPI_KEY_HISTORY, 'X-RapidAPI-Host': 'today-in-history.p.rapidapi.com' },
          HistoryToday,
          transformHistoryToday
      );

      // Google Trend
      await fetchAndSave(
          'https://serpapi.com/search.json?engine=google_trends_trending_now&frequency=realtime&geo=US&cat=all',
          { 'api_key': process.env.API_KEY_GOOGLE_TRENDS },
          GoogleTrend,
          transformGoogleTrend
      );

      // Twitter Trend
      await fetchAndSave(
          'https://twitter-trends5.p.rapidapi.com/twitter/request.php',
          {
              "content-type": "application/x-www-form-urlencoded",
              "X-RapidAPI-Key": process.env.RAPIDAPI_KEY_TWITTER,
              "X-RapidAPI-Host": "twitter-trends5.p.rapidapi.com"
          },
          TwitterTrend,
          transformTwitterTrend
      );

      // AI News
      await fetchAndSave(
          'https://ai-news-api.p.rapidapi.com/news',
          { 'X-RapidAPI-Key': process.env.RAPIDAPI_KEY_AI_NEWS, 'X-RapidAPI-Host': 'ai-news-api.p.rapidapi.com' },
          aiNews,
          transformAiNews
      );

      // NewsData.io
      await fetchAndSave(
          'https://newsdata.io/api/1/news',
          { 'apikey': process.env.API_KEY_NEWS_DATA_IO },
          NewsDataIo,
          transformNewsDataIo
      );

      // Basketball Games
      const currentDate = new Date().toISOString().split('T')[0];
      await fetchAndSave(
          'https://api-basketball.p.rapidapi.com/games',
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
          },
          basketballGames,
          transformBasketballGames
      );

      await db.close();
      console.log('Database connection closed.');
  } catch (error) {
      console.error('Error during database operations:', error);
  }
}

run();


// This is a standalone program which will populate the database with initial data.
/*
async function run() {
  database.on('error', (error) => {
    console.log(error)
    getAllNews();
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
    .then(response => {
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
    .then(response => {
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
  getNewsDataIo();
  getBasketballGames();
}
run();
*/