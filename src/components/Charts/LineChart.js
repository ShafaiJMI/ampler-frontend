import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from 'chart.js';
import axiosInstance from '../../utils/axiosInstance';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const LineChart = () => {
  const [chartData, setChartData] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const applyData = (data) => {
    const labels = [];
  const dataset1 = [];
  const dataset2 = [];
  const dataset3 = [];
    data['stats'].forEach(row => {
      labels.push(row['date']);  // Assuming the first column is the label
      dataset1.push(row['sale']); // Assuming the second column is for dataset 1
      dataset2.push(row['landed_cost']); // Assuming the third column is for dataset 2
      dataset3.push(row['profit']); // Assuming the fourth column is for dataset 3
    });
  
  setChartData({
    labels: labels,
    datasets: [
      {
        label: 'Sales',
        data: dataset1,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.4,
      },
      {
        label: 'Investments',
        data: dataset2,
        fill: false,
        borderColor: 'rgba(153,102,255,1)',
        tension: 0.4,
      },
      {
        label: 'Profits',
        data: dataset3,
        fill: false,
        borderColor: 'rgba(255,159,64,1)',
        tension: 0.4,
      },
    ],
  });
}
const fetchData = async () => {
  try {
  const response = await axiosInstance.get('/analytics/');
      applyData(response.data);
      setIsLoading(false);
      console.log("Analytics Data: ", response.data);
  }
  catch(error) {
      setIsLoading(false);
      console.log(error);
  };
 }
  
  useEffect(() => {
    fetchData();
  },[]);

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

  return isLoading ? <p>Loading data...</p> : <Line data={chartData} options={options} />;
};

export default LineChart;
