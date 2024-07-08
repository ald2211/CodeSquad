import React from 'react';
import { useSelector } from 'react-redux';

const FilterBox = () => {
    const {currentUser}=useSelector((state)=>state.user)
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Filter</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{currentUser.data.role==='developer'?'Project':'Payment'} Type</h3>
        <div className="flex items-center mb-2">
          <input type="checkbox" id="hourly" className="mr-2" />
          <label htmlFor="hourly">Hourly Rate</label>
        </div>
        {currentUser.data.role==='developer'&&<div className="flex items-center">
          <input type="checkbox" id="fixed" className="mr-2" />
          <label htmlFor="fixed">Fixed Rate</label>
        </div>}
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Hourly Rate</h3>
        <div className="flex mb-2">
          <input type="number" placeholder="From" className="w-1/2 p-2 border rounded" />
          <input type="number" placeholder="To" className="w-1/2 ml-2 p-2 border rounded" />
        </div>
      </div>
      {currentUser.data.role==='developer'&&<div>
        <h3 className="text-lg font-semibold mb-2">Fixed Price</h3>
        <div className="flex mb-2">
          <input type="number" placeholder="From" className="w-1/2 p-2 border rounded" />
          <input type="number" placeholder="To" className="w-1/2 ml-2 p-2 border rounded" />
        </div>
      </div>}
    </div>
  );
};

export default FilterBox;
