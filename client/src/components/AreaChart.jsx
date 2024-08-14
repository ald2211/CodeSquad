import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const AreaChart = ({ chartData }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Users Joined Per Day",
      align: "left",
    },
    subtitle: {
      text: "Count of users joined each day",
      align: "left",
    },
    xaxis: {
      type: "datetime",
      categories: [], // Initially empty, will be set dynamically
    },
    yaxis: {
      opposite: true,
    },
    legend: {
      horizontalAlign: "left",
    },
  });

  useEffect(() => {
    if (chartData.length > 0) {
      const formattedSeries = [
        {
          name: "Users Joined",
          data: chartData.map((item) => item.count),
        },
      ];

      const categories = chartData.map((item) => item._id);

      setSeries(formattedSeries);
      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories,
        },
      }));
    }
  }, [chartData]);

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default AreaChart;
