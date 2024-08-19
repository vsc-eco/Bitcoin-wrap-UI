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
          enabled: false,
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      stroke: {
        width: 0,
      },
      tooltip: {
        enabled: false, // Enable tooltips
      },
      xaxis: {
        labels: {
          show: true,
          offsetX: -10,
          offsetY: 0,
        },
        categories: [
          "",
          "Nov 11",
          "Nov 12",
          "Nov 13",
          "Nov 14",
          "Nov 15",
          "Nov 16",
          "",
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
          offsetX: 0,
          offsetY: 0,
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
        colors:['rgb(123, 138, 238)'],
        gradient: {
          shadeIntensity: 0.8,
          opacityFrom: 0.4,
          opacityTo: 0.7,
          stops: [0, 100],
        },
      },
      markers: {
        size: 0, // size of the marker/circle
        strokeWidth: 1, // border width of the circle
        hover: {
          size: 3, // size of the marker when hovered
        },
      },
      annotations: {
        xaxis: [
          {
            x: "Nov 10",
            label: {
              text: "Nov 10",
              style: {
                color: "#333",
                background: "transparent",
              },
            },
          },
        ],
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
      width="550"
      type="area"
    />
  );
};

export default App;
