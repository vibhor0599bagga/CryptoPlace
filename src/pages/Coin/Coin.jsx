import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const { currency } = useContext(CoinContext);
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCoinData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        { method: "GET", headers: { accept: "application/json" } }
      );
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        { method: "GET", headers: { accept: "application/json" } }
      );
      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCoinData();
    fetchHistoricalData().finally(() => setLoading(false));
  }, [coinId, currency]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!coinData) {
    return <div className="error">Unable to fetch coin data. Please try again.</div>;
  }

  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image?.large} alt={coinData.name} />
        <p>
          <b>
            {coinData.name} ({coinData.symbol?.toUpperCase()})
          </b>
        </p>
      </div>

      <div className="coin-chart">
        {historicalData ? (
          <LineChart historicalData={historicalData} />
        ) : (
          <p>No historical data available.</p>
        )}
      </div>

      <div className="coin-info">
        <div className="coin-info-item">
          <p>Crypto Market Rank</p>
          <p>{coinData.market_cap_rank || "N/A"}</p>
        </div>
        <div className="coin-info-item">
          <p>Current Price</p>
          <p>
            {currency.symbol}
            {coinData.market_data?.current_price[currency.name]?.toLocaleString() || "N/A"}
          </p>
        </div>
        <div className="coin-info-item">
          <p>Market Cap</p>
          <p>
            {currency.symbol}
            {coinData.market_data?.market_cap[currency.name]?.toLocaleString() || "N/A"}
          </p>
        </div>
        <div className="coin-info-item">
          <p>24 Hour High</p>
          <p>
            {currency.symbol}
            {coinData.market_data?.high_24h[currency.name]?.toLocaleString() || "N/A"}
          </p>
        </div>
        <div className="coin-info-item">
          <p>24 Hour Low</p>
          <p>
            {currency.symbol}
            {coinData.market_data?.low_24h[currency.name]?.toLocaleString() || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Coin;
