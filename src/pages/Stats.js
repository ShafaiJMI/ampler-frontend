// HomePage.js
import React from 'react';
import LineChart from '../components/LineChart';

const Stats = () => {
    return (
      <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-4 p-6">
        <div className="bg-white shadow-md rounded-lg">
          <LineChart />
        </div>
        <div className="bg-white shadow-md rounded-lg">
        <LineChart />
        </div>
      </div>
  </section>
    );
};

export default Stats;