import mongoose from 'mongoose';

const { Schema } = mongoose;

const aiNewsSchema = new Schema(
    {
        title: { type: String },
        url: { type: String }
    });

const aiNews = mongoose.model('aiNews', aiNewsSchema, 'aiNewss');

export { aiNews };