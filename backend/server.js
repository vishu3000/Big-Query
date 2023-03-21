require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const typeRoutes = require("./routes/types");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/type", typeRoutes);

// listen to port
app.listen(process.env.PORT, () => {
  console.log("listening for requests on port", process.env.PORT);
});
