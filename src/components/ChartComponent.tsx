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
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
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
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
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
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
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
      width="610"
      type="area"
    />
  );
};

export default App;
