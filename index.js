var mongodb_url = "mongodb://127.0.0.1:27017/hotspot";

const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');
// The schema
const schema = require('./schema');
const Hotspot = schema.Hotspot;

const express = require('express')
const axios = require("axios");

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

//Google trend
function getGoogleTrend() {
    axios.get('https://serpapi.com/search.json?engine=google_trends_trending_now&frequency=realtime&geo=US&cat=all&api_key=949a8410438c663d34685340398a4081c9d37595a064129972a2616c17152dc8')
        .then(function (response) {
            const data = response.data.realtime_searches
            console.log(response.data.realtime_searches);
            data.forEach(item => {
                item.articles.forEach(
                    article => {
                        const spot = new Hotspot({
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

// Today in history
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
            const spot = new Hotspot({
                source: 'Today In History',
                title: result.title,
                url: result.url
            })
            spot.save();
        })
}

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

app.listen(8889, () => {
    console.log('start')
})