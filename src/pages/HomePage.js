// HomePage.js
import React from 'react';
import LineChart from '../components/LineChart';

const Stats = () => {
  return(
    <div className='container-sm'>
        <div className="bg-white shadow-md rounded-lg">
  </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">

      <div className="bg-white shadow-md rounded-sm p-4 border-l-4 border-blue-500">
        <div className='flex gap-2'>
      <svg class="w-6 h-6 p-1 bg-blue-500 rounded-sm text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"/>
</svg>
        <h3 className="text-lg font-semibold text-blue-500">Total Sales</h3>
        </div>
        <p className="text-3xl font-bold text-gray-600">₹12,345</p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          View Details
        </button>
      </div>
      <div className="bg-white shadow-md rounded-sm p-4 border-l-4 border-indigo-500">
      <div className='flex gap-2'>
      <svg class="w-6 h-6 p-1 bg-indigo-500 rounded-sm text-indigo-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"/>
</svg>
        <h3 className="text-lg font-semibold text-indigo-500">Total Investments</h3>
        </div>
        <p className="text-3xl font-bold text-gray-600">₹12,345</p>
        <button className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
          View Details
        </button>
      </div>
      <div className="bg-white shadow-md rounded-sm p-4 border-l-4 border-green-500">
      <div className='flex gap-2'>
      <svg class="w-6 h-6 p-1 bg-green-500 rounded-sm text-green-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"/>
</svg>
        <h3 className="text-lg font-semibold text-green-500">Total Profit</h3>
        </div>
        <p className="text-3xl font-bold text-gray-600">₹12,345</p>
        <button className="mt-4 bg-emerald-500 text-white py-2 px-4 rounded hover:bg-green-600">
          View Details
        </button>
      </div>
      <div className="bg-white shadow-md rounded-sm p-4 border-l-4 border-cyan-500">
      <div className='flex gap-2'>
      <svg class="w-6 h-6 p-1 bg-cyan-500 rounded-sm text-cyan-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"/>
</svg>
        <h3 className="text-lg font-semibold text-cyan-500">Total Trips</h3>
        </div>
        <p className="text-3xl font-bold text-gray-600">456</p>
        <button className="mt-4 bg-cyan-500 text-white py-2 px-4 rounded hover:bg-cyan-600">
          View Details
        </button>
      </div>
    </div>
  </div>
  );
};
const HomePage = () => {
    return (
      <section>
      <Stats />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-4 p-6">
        <div className="bg-white shadow-md rounded-lg">
          <LineChart />
        </div>
        <div className="bg-white shadow-md rounded-lg">

        </div>
      </div>
  </section>
    );
};

export default HomePage;