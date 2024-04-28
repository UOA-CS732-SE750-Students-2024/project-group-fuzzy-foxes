import mongoose from "mongoose";

const { Schema } = mongoose;

const twitterTrendSchema = new Schema({
  title: { type: String },
  url: { type: String },
  domainContext: { type: String },
});

const TwitterTrend = mongoose.model(
  "TwitterTrend",
  twitterTrendSchema,
  "twitterTrends"
);

export { TwitterTrend };