import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export const DonutChart = () => {
  const data = {
    labels: ["Heavy","Dehati","Light","Teena","CI"],
    datasets: [
      {
        data: [11, 9, 12, 19, 3],
        backgroundColor: ['#ea6666','#ba6666','#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#ea6666','#ba6666','#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 0,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Profit Share',
      },
    },
    cutout: '60%',
  };
  return <Doughnut data={data} options={options} />;
};



export const BarChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bar Chart Sales Volume',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
};