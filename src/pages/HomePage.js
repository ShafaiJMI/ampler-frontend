// HomePage.js
import React, { useEffect, useState } from 'react';
import LineChart from '../components/Charts/LineChart';
import { BarChartIcon } from '@radix-ui/react-icons';
import {IndianRupeeIcon} from 'lucide-react'
import { BarChart, DonutChart } from '../components/Charts/Chart';
import { MiniStats } from '../components/Charts/MiniStats';
import MiniBarChart from '../components/Charts/MiniBarChart';
import axiosInstance from '../utils/axiosInstance';


const StatsCard = ({title,digits,color,chart,icon}) => {
  return(
    <div className="backdrop-blur-sm bg-white/70 shadow-md rounded-2xl p-4">
      <div className='flex gap-2'>
        <div className={`w-6 h-6 p-1 bg-${color}-500 rounded-sm text-${color}-800 dark:text-white`}>
        {icon}
        </div>
        <h3 className={`text-lg font-semibold text-${color}-600`}>{title}</h3>
      </div>
      <p className="text-3xl font-bold text-gray-600">{digits}</p>
      <div className='w-full h-auto'>
        {chart}
      </div>
    </div>
  );
}

const Stats = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/analytics/');
      setData(response.data);
      setIsLoading(false);
    }
    catch(error) {
      setIsLoading(true)
      console.log(error);
    };
  }
  
  useEffect(() => {
    fetchData();
  },[]);

  return isLoading ? (
    <p>Loading data...</p>
  ) : (
  <div className='container-lg'>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 backdrop-blur-sm bg-white/60 rounded-3xl mx-6">
    <StatsCard title='Total Sale' color={'blue'} digits={`₹${data['total_sale']}`}  icon={<IndianRupeeIcon size={16} />} chart={<MiniStats />}/>
    <StatsCard title='Total Purchases' color={'indigo'} digits={`₹${data['total_investment']}`} icon={<IndianRupeeIcon size={16} />} chart={<MiniStats />}/>
    <StatsCard title='Total Profit' color={'green'} digits={`₹${data['total_profit']}`} icon={<IndianRupeeIcon size={16} />} chart={<MiniStats />}/>
    <StatsCard title='Total Trips' color={'cyan'} digits={data['total_trips']} icon={<BarChartIcon size={16} />} chart={<MiniBarChart />}/>
    </div>
  </div>
  );
}

function HomePage() {
    
    return (
      <section>
      <Stats />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-6">
        <div className="bg-white shadow-md rounded-3xl p-4">
          <BarChart />
        </div>
        <div className="bg-white shadow-md rounded-3xl p-4">
          <DonutChart className="h-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 px-6">
        <div className="bg-white shadow-md rounded-3xl p-4">
          <LineChart data/>
        </div>
      </div>
  </section>
    );
};

export default HomePage;