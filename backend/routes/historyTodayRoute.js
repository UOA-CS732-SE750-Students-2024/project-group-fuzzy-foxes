import express from 'express';
import { HistoryToday } from "../models/historyTodayModel.js";

const router = express.Router();

router.get('/historyTodays', async function (req, res) {
    try {
        const todays = await HistoryToday.find().limit(20)
        return res.status(200).send({results: todays});
    } catch(err) {
        res.status(500).json({ error: 'Error getting history todays' });
    }
});

export default router;