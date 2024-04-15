const mongoose = require('mongoose');

const { Schema } = mongoose;

const hotspotSchema = new Schema(
    {
        source: {type: String},
        title: { type: String },
        content: { type: String },
        url: { type: String },
        thumbnail: { type: String } 
    });

const Hotspot = mongoose.model('Hotspot', hotspotSchema, 'hotspots');

module.exports.Hotspot = Hotspot;