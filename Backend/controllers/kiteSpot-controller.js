const HttpError = require("../models/error");
const { validationResult } = require("express-validator");
const getCoordinatesForKitespot = require("../util/location");
const getConditionForKitespot = require("../util/condition");
const KiteSpot = require("../models/kiteSpotModel");
const User = require("../models/user");
const mongoose = require("mongoose");

//get all kitespots
const getKiteSpots = async (req, res) => {
  const kitespots = await KiteSpot.find({}).sort({ createdAt: -1 });
  res.status(200).json(kitespots);
};

// find KiteSpot by the ID of the KiteSpot
const getKiteSpotByID = async (req, res, next) => {
  const spotId = req.params.sid;

  let spots;
  try {
    spots = await KiteSpot.findById(spotId);
  } catch (err) {
    const error = new HttpError("Something went wrong.", 500);
    return next(error);
  }

  if (!spots) {
    const error = new HttpError(
      "Could not find a KiteSpot for the PlaceID.",
      404
    );
    return next(error);
  }

  res.json({ spot: spots.toObject({ getters: true }) });
};

// find a Kitespot by the ID of the Creator/User
const getKiteSpotsByUserID = async (req, res, next) => {
  const userId = req.params.uid;
  let spots;
  try {
    spots = await KiteSpot.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Fetching the KiteSpot failed, please try again later",
      500
    );
    return next(error);
  }

  if (!spots || spots.length === 0) {
    return next(
      new HttpError("Could not find a KiteSpot for this user id.", 404)
    );
  }
};

// creating a new KiteSpot
const createKiteSpot = async (req, res, next) => {
  const { name, address, description, level, rating, comments, creator } =
    req.body;

  // get the coordinates from Google Maps
  let coordinates;
  try {
    coordinates = await getCoordinatesForKitespot(address);
  } catch (error) {
    return next(error);
  }
  const lat = coordinates.lat;
  const lng = coordinates.lng;

  // get the wind from The Weather APP
  let condition;
  try {
    condition = await getConditionForKitespot(lat, lng);
  } catch (error) {
    return next(error);
  }

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!address) {
    emptyFields.push("address");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!level) {
    emptyFields.push("level");
  }
  if (!rating) {
    emptyFields.push("rating");
  }
  if (!comments) {
    emptyFields.push("comments");
  }
  if (!creator) {
    emptyFields.push("creator");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add to the database
  try {
    const kitespot = await KiteSpot.create({
      name,
      address,
      description,
      location: coordinates,
      condition,
      picture:
        "https://images.unsplash.com/photo-1627068477565-3a66d5f76d5e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2l0ZSUyMHN1cmZ8ZW58MHx8MHx8fDA%3D",
      level,
      rating,
      comments,
      creator,
    });
    res.status(200).json(kitespot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// deleting a Kitespot
const deleteKiteSpot = async (req, res) => {
  const { sid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(sid)) {
    return res.status(400).json({ error: "No such kitespot found" });
  }

  const kitespot = await KiteSpot.findOneAndDelete({ _id: sid });

  if (!kitespot) {
    return res.status(400).json({ error: "No such kitespot found" });
  }

  res.status(200).json(kitespot);
};

exports.getKiteSpotByID = getKiteSpotByID;
exports.getKiteSpotsByUserID = getKiteSpotsByUserID;
exports.createKiteSpot = createKiteSpot;
exports.deleteKiteSpot = deleteKiteSpot;
exports.getKiteSpots = getKiteSpots;
