const api_helper = require('./API_helper')
const { token } = require("morgan");

let connection;

exports.getMarkets = async (req, res) => {
    api_helper.make_API_call('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(response => {
      
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    })


};







