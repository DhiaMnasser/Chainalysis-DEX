const express = require("express");
const app = express();
const route = express.Router();

const {
  
  getMarkets,
  getCoinDetails

} = require("../controllers/coingeckoController");

//import validator
const { runValidation } = require("../validators");


//pass on controllers
route.get("/coingecko/markets", getMarkets);
route.post("/coingecko/coinDetails", getCoinDetails);


module.exports = route;
