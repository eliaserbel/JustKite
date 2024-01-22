const axios = require("axios");
const HttpError = require("../models/error");
require("dotenv").config();

const OW_API = process.env.OPENWEATHER_API;

async function getConditionForKitespot(lat, lng) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OW_API}`
  );

  const data = response.data;

  if (!data) {
    const error = new HttpError("Could not get the wind Information.", 422);
    throw error;
  }

  const condition = data.wind.speed;

  return condition;
}

module.exports = getConditionForKitespot;
