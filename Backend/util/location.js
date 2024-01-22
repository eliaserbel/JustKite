const axios = require("axios");
const HttpError = require("../models/error");
require("dotenv").config();
const API_KEY = process.env.GOOGLEGEO_API;

async function getCoordinatesForKitespot(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data; //get the data from the API

  if (!data) {
    const error = new HttpError("Could not find location.", 422);
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordinatesForKitespot;
