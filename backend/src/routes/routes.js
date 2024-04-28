import express from "express";
import { GoogleTrend } from "../data/googleTrendSchema.js";
import { HistoryToday } from "../data/historyinTodaySchema.js";
import { TodayWeather } from "../data/TodayWeatherSchema.js";
import { TwitterTrend } from "../data/twitterTrendSchema.js";
import { aiNews } from "../data/ainewsSchema.js";

const router = express.Router();

router.get("/googleTrends", async function (req, res) {
  try {
    const trends = await GoogleTrend.find().limit(20);
    const result = {
      data: {
        list: trends,
        total: trends.length,
      },
      msg: "Request successful",
      code: 200,
    };
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error getting google trends" });
  }
});

router.get("/historyTodays", async function (req, res) {
  try {
    const todays = await HistoryToday.find().limit(20);
    return res.status(200).send({ results: todays });
  } catch (err) {
    res.status(500).json({ error: "Error getting history todays" });
  }
});

router.get("/TodayWeathers", async function (req, res) {
  try {
    const weathers = await TodayWeather.find().limit(20);
    return res.status(200).send({ results: weathers });
  } catch (err) {
    res.status(500).json({ error: "Error getting Today Weather" });
  }
});

router.get("/twitterTrends", async function (req, res) {
  try {
    const trends = await TwitterTrend.find().limit(20);
    const result = {
      data: {
        list: trends,
        total: trends.length,
      },
      msg: "Request successful",
      code: 200,
    };
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error getting twitter trends" });
  }
});

router.get("/aiNews", async function (req, res) {
  try {
    const news = await aiNews.find().limit(20);
    const result = {
      data: {
        list: news,
        total: news.length,
      },
      msg: "Request successful",
      code: 200,
    };
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error getting latest news" });
  }
});

export default router;

