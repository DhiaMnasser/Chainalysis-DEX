import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HistoryChart from "../components/HistoryChart";
import CoinData from "../components/CoinData";
import API from "../apis/coinGecko";

const CoinDetailPage = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const resp = await API.post('/api/coingecko/coinDetails',{coinId:id}) ;
      const day = resp.data[0] ;
      const week =resp.data[1] ;
      const year = resp.data[2] ;
      const detail = resp.data[3] ;
      const coinBaseDetails =  resp.data[4] ;
      
      console.log(day);

      setCoinData({
        day: formatData(day.prices),
        week: formatData(week.prices),
        year: formatData(year.prices),
        detail: detail[0],
        coinBaseDetails: coinBaseDetails
      });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const renderData = () => {
    if (isLoading) {
      return <div>Loading....</div>;
    }
    return (
      <div className="coinlist">
        <HistoryChart data={coinData} />
        <CoinData data={coinData.detail} />
      </div>
    );
  };

  return renderData();
};

export default CoinDetailPage;
