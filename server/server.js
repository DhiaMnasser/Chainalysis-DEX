const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

//bring routes
const cryptoRoutes = require("./routes/cryptoRoutes");

//app
const app = express();

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());


//cors
if (process.env.NODE_ENV == "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

//routes middleware
app.use("/api", cryptoRoutes);

//port
const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});
