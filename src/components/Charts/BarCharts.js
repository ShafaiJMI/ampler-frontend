import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function BarCharts(){
  
    const data = [
      { name: 'Jan', sales: 5 },
      { name: 'Feb', sales: 8 },
      { name: 'Mar', sales: 4 },
      { name: 'Apr', sales: 9 },
      { name: 'May', sales: 7 },
      { name: 'Jun', sales: 6 },
      { name: 'Jul', sales: 8 },
      { name: 'Aug', sales: 4 },
      { name: 'Sep', sales: 9 },
      { name: 'Oct', sales: 7 },
      { name: 'Nov', sales: 5 },
      { name: 'Dec', sales: 7 },
    ]
    
  
    return (
     
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#60a5fa" radius={[4, 4, 0, 0]}/>
          </BarChart>
        </ResponsiveContainer>
     
    );
  }

export default BarCharts;