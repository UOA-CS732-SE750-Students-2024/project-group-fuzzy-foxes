import express from 'express';
import { GoogleTrend } from "../models/googleTrendModel.js";

const router = express.Router();

router.get('/googleTrends', async function (req, res) {
    try {
        const trends = await GoogleTrend.find().limit(20)
        return res.status(200).send({results: trends});
    } catch(err) {
        res.status(500).json({ error: 'Error getting google trends' });
    }
});

export default router;