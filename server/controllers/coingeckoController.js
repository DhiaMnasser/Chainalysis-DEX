const api_helper = require('./API_helper')



exports.getMarkets = async (req, res) => {
  console.log('getting coins');
    api_helper.make_API_call('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(response => {
      
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    })


};

exports.getCoinDetails = async (req, res) => {
  const coinId = req.body.coinId;

var urls = [`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1`,
            `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`,
            `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=365`,
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
          
          ];
var responses = [];
var completed_requests = 0;

for (i in urls) {
  await api_helper.make_API_call(urls[i])
  .then(response => {
    // console.log('response',response);
    responses.push(response);
    completed_requests++;

    })
    .catch(error => {
        res.send(error)
    })
       
};

if (completed_requests == urls.length) {
  // All download done, process responses array
  res.json(responses);
}

res.send(new Error('requests failed'))
};






