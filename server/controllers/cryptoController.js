const api_helper = require('./API_helper')

var Client = require('coinbase').Client;
var client = new Client({'apiKey': 'fzaYYcPhNDtgcdfN',
                         'apiSecret': 'Ubi3NNR0PnzeosZN3r8B1ylZ7jfkayb0',
                         strictSSL: false});



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

const getBuyPriceCoinBase = async (symbol) => {
  return new Promise((resolve, reject) => {
      client.getBuyPrice({'currencyPair': `${symbol}-USD`}, function(err, price) {
        if (err) reject(err)
        console.log('price',price);
        resolve(price.data)
    });
      
  })
}

const getSellPriceCoinBase = async (symbol) => {
  return new Promise((resolve, reject) => {
      client.getSellPrice({'currencyPair': `${symbol}-USD`}, function(err, price) {
        if (err) reject(err)
        console.log('price',price);
        resolve(price.data)
    });
      
  })
}

const getPriceBlockChain = async (symbol) => {
  let price;
  await api_helper.make_API_call(`https://api.blockchain.com/v3/exchange/tickers/${symbol}-USD`)
  .then(response => {
    console.log('response',response.last_trade_price);
    price = response.last_trade_price;

    })
    .catch(error => {
        res.send(error)
    })
    return price;
};

const getSellPriceBlockChain = async (price) => {
  let blockchainFees = 0.0024;
  let sellPrice = price - price * blockchainFees;
  // there's currently a bug in the blockchain.com api that prevents us from getting the fees but its documented in their api as 0.0024%
  // await api_helper.make_API_call(`https://api.blockchain.com/v3/exchange/fees`)
  // .then(response => {
  //   console.log('response',response.takerRate);
  //   sellPrice = price + price * response.takerRate;

  //   })
  //   .catch(error => {
  //       res.send(error)
  //   })
    return sellPrice.toFixed(2) ;
}

exports.getCoinDetails = async (req, res) => {
  const coinId = req.body.coinId;
  const sybmol = coinId=="bitcoin"?'BTC':'ETH'

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
    responses.push(response);
    completed_requests++;

    })
    .catch(error => {
        res.send(error)
    })
       
};

let coinBaseDetails = {};
coinBaseDetails.buyPrice = await getBuyPriceCoinBase(sybmol);
coinBaseDetails.sellPrice = await getSellPriceCoinBase(sybmol);

let blockChainDetails = {};
blockChainDetails.price = await getPriceBlockChain(sybmol);
blockChainDetails.sellPrice = await getSellPriceBlockChain(blockChainDetails.price);

if (completed_requests == urls.length) {
  responses.push(coinBaseDetails);
  responses.push(blockChainDetails);
  res.json(responses);
}

res.send(new Error('requests failed'))
};







