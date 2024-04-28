import mongoose from 'mongoose';

const { Schema } = mongoose;

const historyTodayModal = new Schema(
    {
        title: { type: String },
        content: { type: String },
        url: { type: String },
        thumbnail: { type: String } 
    });

const HistoryToday = mongoose.model('HistoryToday', historyTodayModal, 'historyTodays');

export { HistoryToday };