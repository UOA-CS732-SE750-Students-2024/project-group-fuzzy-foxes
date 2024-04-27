import mongoose from 'mongoose';

const { Schema } = mongoose;

const twitterTrendSchema = new Schema(
    {
        name: { type: String },
        volumeShort: { type: String },
        domainContext: { type: String }
    });

const TwitterTrend = mongoose.model('TwitterTrend', twitterTrendSchema, 'twitterTrends');

export { TwitterTrend };