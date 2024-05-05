import mongoose from 'mongoose';

const { Schema } = mongoose;

const basketballGamesSchema = new Schema(
    {
        team1Logo: String,
        team2Logo: String,
        team1: String,
        team2: String,
        score1: Number,
        score2: Number,
        status: String,
        matchTime: String
    });

const basketballGames = mongoose.model('basketballGames', basketballGamesSchema, 'basketballGames');

export { basketballGames };