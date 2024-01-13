const express = require("express");
const { getKiteSpots } = require("../controllers/kiteSpotController");

const router = express.Router();

// GET all kiteSpots
router.get("/", getKiteSpots);

module.exports = router;
