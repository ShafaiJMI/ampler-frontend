// HomePage.js
import React, { useEffect, useState } from 'react';
//import LineChart from '../components/Charts/LineChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axiosInstance from '../utils/axiosInstance';

const Linechart = ({chartData,dataKey,color}) => {
  
  useEffect(() => {console.log("data passed : ",chartData)})
    return (
        <ResponsiveContainer width="100%" height={400}>
        <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}>
              <CartesianGrid strokeDasharray="3 3" />
            <XAxis/>
          <YAxis />
          
          <Legend />
            <Line type="monotone" dataKey={dataKey} stroke={color} activeDot={{ r: 2 }} />

          </LineChart>
          </ResponsiveContainer>
    );
};

function Stats() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
    const response = await axiosInstance.get('/analytics/');
        setData(response.data.stats);
        setIsLoading(false);
        console.log("Analytics Data: ", response.data.stats);
    }
    catch(error) {
        setIsLoading(false);
        console.log(error);
    };
   }

  useEffect(() => {
    fetchData();
  },[])
  
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-4 p-6">
        <div className="bg-white shadow-md rounded-3xl p-4">
<Linechart chartData={data} dataKey={"profit_percentage"} color={"#aeca9d"}/>
</div>
<div className="bg-white shadow-md rounded-3xl p-4">
<Linechart chartData={data} dataKey={"carrier_charge_per_kilo"} color={"#82ca9d"}/>
</div>
<div className="bg-white shadow-md rounded-3xl p-4">
<Linechart chartData={data} dataKey={"carrier_charge_percent"} color={"#82ca9d"}/>
</div>
      </div>
  </section>
  )
}

export default Stats;