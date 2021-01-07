const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

//---------DATABASE SETUP------------------
const mongo_uri = process.env.mongo_uri;

const connect = mongoose.connect(mongo_uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
connect.then(
  (db) => {
    console.log("Database Connected Successfully");
  },
  (err) => {
    console.log("Error occur while connecting ", err);
  }
);
// --------------------------------------

app.get("/", (req, res) => {
  res.send("Working setup");
});

let port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log("Server Listening at http://localhost:3030");
});
