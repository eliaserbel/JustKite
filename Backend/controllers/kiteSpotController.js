const KiteSpot = require("../models/kiteSpotModel");
const mongoose = require("mongoose");

// get all kiteSpots
const getKiteSpots = async (req, res) => {
  const kitespots = await KiteSpot.find({}).sort({ createdAt: -1 });

  res.status(200).json(kitespots);
};

module.exports = {
  getKiteSpots,
};
