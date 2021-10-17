const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

//bring routes
const coingeckoRoutes = require("./routes/coingeckoRoutes");
const binanceRoutes = require("./routes/binanceRoutes");

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

//routes middleware
// app.use("/", ()=>{console.log('hello')});
app.use("/api", coingeckoRoutes);
app.use("/api", binanceRoutes);

//port
const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});
