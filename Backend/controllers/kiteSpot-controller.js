const HttpError = require("../models/error");
const { validationResult } = require("express-validator");
const getCoordinatesForKitespot = require("../util/location");
const getConditionForKitespot = require("../util/condition");
const KiteSpot = require("../models/kiteSpotModel");

//Dummy Kitespots
let Dummy_Kitespots = [
  {
    id: "123",
    name: "Tulum",
    location: {
      lat: 20.1766996,
      lng: -87.5052612,
    },
    condition: "windy, lot of waves",
    rating: "5-Stars",
    comments: "sdsdsd",
    user_id: "Elias123",
  },
  {
    id: "456",
    name: "Isla Blanca",
    location: {
      lat: 21.3830549,
      lng: -86.8072441,
    },
    pictures: "dndbdgsn",
    level: 2,
    condition: "windy, flat water",
    rating: "4.5-Stars",
    comments: "dfdfdf",
    user_id: "Ximena123",
  },
  {
    id: "789",
    name: "Cozumel",
    location: {
      lat: 20.432006,
      lng: -87.0390633,
    },
    pictures: "sdsdsd",
    level: 1,
    condition: "windy",
    rating: "3.5-Stars",
    comments: "fesfggd",
    user_id: "Elias123",
  },
];

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }

  const { name, address, description, level, rating, comments, creator } =
    req.body;

  let coordinates;
  try {
    coordinates = await getCoordinatesForKitespot(address);
  } catch (error) {
    return next(error);
  }

  const lat = coordinates.lat;
  const lng = coordinates.lng;

  let condition;
  try {
    condition = await getConditionForKitespot(lat, lng);
  } catch (error) {
    return next(error);
  }

  const createdKiteSpot = new KiteSpot({
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

  try {
    await createdKiteSpot.save();
  } catch (err) {
    const error = new HttpError("Could not created this KiteSpot.", 500);
    return next(error);
  }

  res.status(201).json({ kitespot: createdKiteSpot });
};

// deleting a Kitespot
const deleteKiteSpot = async (req, res, next) => {
  const spotId = req.params.sid;
  let spot;
  try {
    spot = await KiteSpot.findById(spotId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete the KiteSpot.",
      500
    );
    return next(error);
  }

  try {
    await spot.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete the KiteSpot.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted the KiteSpot." });
};

exports.getKiteSpotByID = getKiteSpotByID;
exports.getKiteSpotsByUserID = getKiteSpotsByUserID;
exports.createKiteSpot = createKiteSpot;
exports.deleteKiteSpot = deleteKiteSpot;
