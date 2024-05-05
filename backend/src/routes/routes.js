import express from "express";
import { GoogleTrend } from "../data/googleTrendSchema.js";
import { HistoryToday } from "../data/historyinTodaySchema.js";
import { TodayWeather } from "../data/TodayWeatherSchema.js";
import { TwitterTrend } from "../data/twitterTrendSchema.js";
import { aiNews } from "../data/ainewsSchema.js";
import { NewsDataIo } from "../data/newsdataIOSchema.js";
import { User } from "../data/userInfoSchema.js";
import { basketballGames } from "../data/basketballSchema.js";
import bcrypt from 'bcrypt';
//import jwt from 'jsonwebtoken';


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


// User registration route
router.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const newUser = new User({ username, email, password });
    await newUser.save(); // Save the new user to MongoDB
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Username or email already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});


// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email (or you could use username, depending on your schema)
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token
    //const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' }); , token

    // Return the token to the client     
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error'});
  }
});

export default router;

