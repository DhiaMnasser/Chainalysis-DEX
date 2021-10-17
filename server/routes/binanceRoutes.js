const express = require("express");
const route = express.Router();

const {
  getMarkets

} = require("../controllers/binanceController");

//import validator
const { runValidation } = require("../validators");


//pass on controllers
route.get("/binance/markets", runValidation, getMarkets);




module.exports = route;
