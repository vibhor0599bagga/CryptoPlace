import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Price"]]);

  useEffect(() => {
    if (historicalData?.prices) {
      const dataCopy = [["Date", "Price"]];
      historicalData.prices.forEach((item) => {
        dataCopy.push([new Date(item[0]).toLocaleDateString().slice(0, -5), item[1]]);
      });
      setData(dataCopy);
    }
  }, [historicalData]);

  return (
    <Chart
      chartType="LineChart"
      data={data}
      options={{
        title: "Price Trend",
        hAxis: { title: "Date" },
        vAxis: { title: "Price" },
      }}
      height="400px"
      width="100%"
      legendToggle
    />
  );
};

export default LineChart;
