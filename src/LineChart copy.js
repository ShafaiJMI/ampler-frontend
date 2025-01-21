import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const LineChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Replace these with your own values
    const spreadsheetId = '1bFDKQrU2da1XfRIFQuivynPEhwA4QFKTGszg4Phm9OQ';
    const apiKey = 'AIzaSyALQ7lOSU81NBD5afDkYpA5OuVlCaaeEqo';
    const range = 'Summary!H4:R100';

    const fetchData = async () => {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
      );
      const data = await response.json();

      const labels = [];
      const dataset1 = [];
      const dataset2 = [];
      const dataset3 = [];

      data.values.forEach(row => {
        labels.push(row[0]);  // Assuming the first column is the label
        dataset1.push(row[1]); // Assuming the second column is for dataset 1
        dataset2.push(row[2]); // Assuming the third column is for dataset 2
        dataset3.push(row[3]); // Assuming the fourth column is for dataset 3
      });

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: dataset1,
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.4,
          },
          {
            label: 'Dataset 2',
            data: dataset2,
            fill: false,
            borderColor: 'rgba(153,102,255,1)',
            tension: 0.4,
          },
          {
            label: 'Dataset 3',
            data: dataset3,
            fill: false,
            borderColor: 'rgba(255,159,64,1)',
            tension: 0.4,
          },
        ],
      });
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return chartData ? <Line data={chartData} options={options} /> : <p>Loading data...</p>;
};

export default LineChart;
