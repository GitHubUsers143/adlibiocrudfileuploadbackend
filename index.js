// Import packages
const express = require("express");
const home = require("./routes/home");

// Middlewares
const app = express();
app.use(express.json());
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

mongoose.connect(
  "mongodb+srv://cloudmongodbuser1:cloudmongodbpassword143@cluster0.gavsumi.mongodb.net/ad-lib-io?retryWrites=true&w=majority"
);
// Routes
app.use("/home", home);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
