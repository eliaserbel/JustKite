const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const kiteSpotSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    picture: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    condition: {
      type: Number,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("KiteSpot", kiteSpotSchema);
