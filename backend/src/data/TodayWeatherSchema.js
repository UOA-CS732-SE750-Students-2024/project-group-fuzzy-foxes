import mongoose from 'mongoose';

const { Schema } = mongoose;

const TodayWeatherSchema = new Schema(
    {
        city: { type: String },
        current_weather: { type: String },
        bg_image: { type: String },
        temp: { type: String } 
    });

const TodayWeather = mongoose.model('TodayWeather', TodayWeatherSchema, 'TodayWeathers');

export { TodayWeather };