import React from 'react';

const StatsBox = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Stats</h2>
      <div className="grid lg:grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-600 mb-2">Committed Projects</p>
          <p className="text-2xl font-bold text-blue-600">5</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-600 mb-2">Closed Projects</p>
          <p className="text-2xl font-bold text-green-600">10</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-600 mb-2">Total Earnings</p>
          <p className="text-2xl font-bold text-yellow-600">$5000</p>
        </div>
      </div>
    </div>
  );
};

export default StatsBox;
