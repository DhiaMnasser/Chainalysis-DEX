import React, { useEffect, useState, useContext } from "react";
import API from "../apis/coinGecko";
import { WatchListContext } from "../context/watchListContext";
import Coin from "./Coin";

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const { watchList } = useContext(WatchListContext);
  const [isLoading, setIsLoading] = useState(false);
  console.log(watchList);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await API.get("/api/crypto/markets");
      console.log('response',response);
      setCoins(response.data);
      setIsLoading(false);
    };

    if (watchList.length > 0) {
      fetchData();
    } else setCoins([]);
  }, [watchList]);

  const renderCoins = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <ul className="coinlist list-group mt-2">
        {coins.map((coin) => {
          return <Coin key={coin.id} coin={coin}/>;
        })}
      </ul>
    );
  };

  return <div>{renderCoins()}</div>;
};

export default CoinList;
