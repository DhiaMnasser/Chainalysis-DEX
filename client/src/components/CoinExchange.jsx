import React from "react";

const CoinExchange = ({ coinBaseDetails, blockChainDetails }) => {
  console.log('data', coinBaseDetails);
  const renderData = () => {
    if (coinBaseDetails) {
      return (
        <div className='container'>


          <div className="card-group">

            <div className="card m-2">
              <div className="card-body">
              {blockChainDetails.sellPrice < coinBaseDetails.sellPrice.amount &&
                    <a href="https://www.coinbase.com/" class="badge badge-success">Best Sell Price</a>
                }
                {blockChainDetails.price > coinBaseDetails.buyPrice.amount &&
                    <a href="https://www.coinbase.com/" class="badge badge-success">Best Buy Price</a>
                }
                <h5 className="card-title">CoinBase :</h5>
                <div className="d-flex flex-column">
                  <span className="text-muted coin-data-category">Sell Price</span>
                  <span>{coinBaseDetails.sellPrice.amount}$</span>
                </div>
                <hr />
                <div className="d-flex flex-column">
                  <span className="text-muted coin-data-category">
                    Buy Price
                  </span>
                  <span>{coinBaseDetails.buyPrice.amount}$</span>
                </div>
              </div>
            </div>
            <div className="card m-2">
              <div className="card-body">
                {blockChainDetails.sellPrice > coinBaseDetails.sellPrice.amount &&
                    <a href="https://www.blockchain.com/" class="badge badge-success">Best Sell Price</a>
                }
                {blockChainDetails.price < coinBaseDetails.buyPrice.amount &&
                    <a href="https://www.blockchain.com/" class="badge badge-success">Best Buy Price</a>
                }

                <h5 className="card-title">Blockchian.com :</h5>
                <div className="d-flex flex-column">
                  <span className="text-muted coin-data-category">Sell Price</span>
                  <span>{blockChainDetails.sellPrice}$</span>
                </div>
                <hr />
                <div className="d-flex flex-column">
                  <span className="text-muted coin-data-category">
                    Buy Price
                  </span>
                  <span>{blockChainDetails.price}$</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return <div>{renderData()}</div>;
};

export default CoinExchange;
