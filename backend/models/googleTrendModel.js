import mongoose from 'mongoose';

const { Schema } = mongoose;

const googleTrendSchema = new Schema(
    {
        title: { type: String },
        content: { type: String },
        url: { type: String },
        thumbnail: { type: String } 
    });

const GoogleTrend = mongoose.model('GoogleTrend', googleTrendSchema, 'googleTrends');

export { GoogleTrend };