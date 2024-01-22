require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const kiteSpotsRoutes = require("./routes/kiteSpot-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/error");
const cors = require("cors");

// express app
const app = express();

// cors
app.use(cors());

// Port
const PORT = process.env.PORT || 3000;

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//middleware
app.use(express.json());

//Body-Parser
app.use(bodyParser.json());

// routes
app.use("/api/kiteSpots", kiteSpotsRoutes);
app.use("/api/users", usersRoutes);

// error Handling
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// error Handling
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});
