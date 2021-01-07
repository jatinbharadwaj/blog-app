const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

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

//-------------GENRAL CONFIGURATION----------
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//-------------------------------------------

app.get("/", (req, res) => {
  res.render("landing");
});

let port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log("Server Listening at http://localhost:3030");
});
