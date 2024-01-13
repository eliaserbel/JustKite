require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const kiteSpotRoutes = require("./routes/kiteSpot");

// express app
const app = express();

const PORT = process.env.PORT || 3000;

// port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// middleware
app.use(express.json());

// routes
app.use("/api/workouts", kiteSpotRoutes);
