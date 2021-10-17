const express = require("express");
const app = express();
const route = express.Router();

const {
  
  getMarkets,
  getCoinDetails

} = require("../controllers/cryptoController");

//import validator
const { runValidation } = require("../validators");


//pass on controllers
route.get("/crypto/markets", getMarkets);
route.post("/crypto/coinDetails", getCoinDetails);


module.exports = route;
