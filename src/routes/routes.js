import express from "express";
import { GoogleTrend } from "../data/googleTrendSchema.js";
import { HistoryToday } from "../data/historyinTodaySchema.js";
import { TodayWeather } from "../data/TodayWeatherSchema.js";

const router = express.Router();

router.get('/googleTrends', async function (req, res) {
  try {
      const trends = await GoogleTrend.find().limit(20)
      return res.status(200).send({results: trends});
  } catch(err) {
      res.status(500).json({ error: 'Error getting google trends' });
  }
});

router.get('/historyTodays', async function (req, res) {
  try {
      const todays = await HistoryToday.find().limit(20)
      return res.status(200).send({results: todays});
  } catch(err) {
      res.status(500).json({ error: 'Error getting history todays' });
  }
});

router.get('/TodayWeathers', async function (req, res) {
  try {
      const weathers = await TodayWeather.find().limit(20)
      return res.status(200).send({results: weathers});
  } catch(err) {
      res.status(500).json({ error: 'Error getting Today Weather'});
  }
});


export default router;
