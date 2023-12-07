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
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
        colorStops: []
      }
    }
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
