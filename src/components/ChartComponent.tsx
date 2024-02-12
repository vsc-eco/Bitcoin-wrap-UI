import React, { useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const App = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "trade",
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false,
      },
      legend:{
        show: false
      },
      stroke: {
        width: 1
      },
      tooltip: {
        enabled: false,
      },
      xaxis: {
        labels: {
          show: true
        },
        categories: [
          "",
          "Nov 10",
          "Nov 11",
          "Nov 12",
          "Nov 13",
          "Nov 14",
          "Nov 15",
        ],
        axisBorder: {
          show: false,
        },
        axisLabel: {
          show: true,
        },
      },
      yaxis: {
        labels: {
          show: true,
        },
        min: 0,
        max: 100,
        forceNiceScale: false,
      },
      grid: {
        show: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.8,
          opacityFrom: 0.4,
          opacityTo: 0.7,
          stops: [0, 100],
        },
      },
    },
    series: [
      {
        name: "series",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      width="600"
      type="area"
    />
  );
};

export default App;
