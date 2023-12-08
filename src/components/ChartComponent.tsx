import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Chart from "react-apexcharts";

const App = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "trade",
        toolbar: {
          show: false,
        },
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
          shade: "lightblue", // Set the light blue color
          type: "horizontal",
          shadeIntensity: 0.2, // Adjust shade intensity as needed
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
          colorStops: [],
        },
      },
    },
    series: [
      {

        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
        dataLabels: {
          enabled: false, // Set to false to hide the price labels
        },
      },
    ],
  });

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="area"
      width="610"
    />
  );
};

export default App;
