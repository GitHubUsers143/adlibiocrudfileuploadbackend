// Import packages
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

mongoose.connect(
  "mongodb+srv://cloudmongodbuser1:cloudmongodbpassword143@cluster0.gavsumi.mongodb.net/ad-lib-io?retryWrites=true&w=majority"
);

const app = express();

app.use(cors());

app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("Express is here");
});

app.listen("9001", function () {
  console.log("Server is running");
});
