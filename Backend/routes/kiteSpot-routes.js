const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const kiteSpotsController = require("../controllers/kiteSpot-controller");

//get all Kitespots
router.get("/", kiteSpotsController.getKiteSpots);

//get a Kitespot by ID
router.get("/:sid", kiteSpotsController.getKiteSpotByID);

//get a Kitspot by user ID
router.get("/user/:uid", kiteSpotsController.getKiteSpotsByUserID);

//post a new Kitespot
router.post("/", kiteSpotsController.createKiteSpot);

//delete a Kitespot by ID
router.delete("/:sid", kiteSpotsController.deleteKiteSpot);

module.exports = router;
