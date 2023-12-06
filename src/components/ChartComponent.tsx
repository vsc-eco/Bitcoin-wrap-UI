import React, { useState } from "react";
import Chart from "react-apexcharts";

const App = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "trade",
      },
      xaxis: {
        categories: ["Nov 9", "Nov 10", "Nov 11", "Nov 12", "Nov 13", "Nov 14", "Nov 15"],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="line"
      width="500"
    />
  );
};

export default App;
