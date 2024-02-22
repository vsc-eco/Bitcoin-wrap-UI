import React, { useState } from "react";
import dynamic from "next/dynamic";

//TODO: to figure out the hovering markers and margins

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
          enabled: false
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      dataLabels: {
        enabled: false,
      },
      legend:{
        show: false
      },
      stroke: {
        width: 0
      },
      tooltip: {
        enabled: false, // Enable tooltips

      },
      markers: {
        size: 0,
        colors: ["#ffffff"], // size of the marker/circle
        hover: {
          size: 5,
          sizeOffset: 5 // size of the marker when hovered
        }
      },
      xaxis: {
        labels: {
          show: true,
          offsetX: 0,
          offsetY: 0
        },
        categories: [
          "Nov 10",
          "Nov 11",
          "Nov 12",
          "Nov 13",
          "Nov 14",
          "Nov 15",
          "Nov 16",
          "Nov 17",
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
          offsetY: 0
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

      // annotations : {
      //   xaxis: [{
      //     x: "Nov 10",
      //     label: {
      //       text: "Nov 10",
      //       style: {
      //         color: "#333",
      //         background: "transparent"
      //       }
      //     }
      //   }]
      // }
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
