var mongodb_url = "mongodb://127.0.0.1:27017/hotspot";

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import {getGoogleTrend} from './controllers/googleTrendController.js'
import {getTodayInHistory} from './controllers/historyTodayController.js'

import googleTrendRouter from './routes/googleTrendRoute.js'
import historyTodayRouter from './routes/historyTodayRoute.js'

const app = express()

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(mongodb_url);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

function getAllNews() {
    getGoogleTrend();
    getTodayInHistory();
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

// Do a get after start
getAllNews();

// Then do one get every 24 hours
setScheduledTask(4, 0, getAllNews);

//Router set up
app.use('/googleTrend', googleTrendRouter);
app.use('/historyToday', historyTodayRouter);

// API for frontend
app.listen(8889, () => {
    console.log('start')
})