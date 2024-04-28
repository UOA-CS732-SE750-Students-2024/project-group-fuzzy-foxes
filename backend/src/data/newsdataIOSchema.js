import mongoose from 'mongoose';

const { Schema } = mongoose;

const newsDataIoSchema = new Schema(
    {
        title: { type: String },
        source: { type: String },
        url: { type: String },
        pubDate: { type: Date } 
    });

const NewsDataIo = mongoose.model('NewsDataIoCollection', newsDataIoSchema, 'NewsDataIoCollection');

export { NewsDataIo };