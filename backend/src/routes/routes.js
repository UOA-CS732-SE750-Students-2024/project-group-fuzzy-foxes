import express from "express";
import { GoogleTrend } from "../data/googleTrendSchema.js";
import { HistoryToday } from "../data/historyinTodaySchema.js";
import { TwitterTrend } from "../data/twitterTrendSchema.js";
import { aiNews } from "../data/ainewsSchema.js";
import { NewsDataIo } from "../data/newsdataIOSchema.js";
import { User } from "../data/userInfoSchema.js";
import { basketballGames } from "../data/basketballSchema.js";
import bcrypt from 'bcrypt';

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


router.get("/newsdataIO", async function (req, res) {
  try {
    const news = await NewsDataIo.find().limit(20);
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


// User registration route
router.post('/register', async (req, res) => {
  const { username, email, password, } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save(); // Save the new user to MongoDB
    res.send('User registered successfully');
  } catch (error) {
    if (error.code === 11000) {
      res.send('Username or email already exists' );
    } 
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user) {
      return res.send('User not found');
    }
    if (!isMatch) {
      return res.send('Incorrect password');
    }
    res.send('Login successful');
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/basketballGames", async function (req, res) {
  try {
    const games = await basketballGames.find().limit(2);
    const result = {
      data: {
        list: games,
        total: games.length,
      },
      msg: "Request successful",
      code: 200,
    };
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error getting latest games" });
  }
});
export default router;

