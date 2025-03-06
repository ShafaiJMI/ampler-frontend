import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

export const MiniStats = () => {
    const data = [
      {
        amt: 2400,
      },
      { 
        amt: 2210,
      },
      { 
        amt: 2290,
      },
      { 
        amt: 2000,
      },
      {
        amt: 2181,
      },
      {
        amt: 2500,
      },
      {
        amt: 2100,
      },
    ];
    return (
      <ResponsiveContainer width="100%" height={100}>
      <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}>
          
            <Line type="monotone" dataKey="amt" stroke="#e8ca9d" />
          </LineChart>
         </ResponsiveContainer>
    )
  }