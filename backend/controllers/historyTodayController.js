import axios from 'axios';
import { HistoryToday } from "../models/historyTodayModel.js";

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
            const spot = new HistoryToday({
                source: 'Today In History',
                title: result.title,
                url: result.url
            })
            spot.save();
        })
}

export {getTodayInHistory}