import React from 'react';

const MiniNav = () => {
  return (
    <div className="flex justify-start mb-4">
      <button className="bg-white ml-2 text-black border border-black py-1 px-7 text-sm rounded-full hover:bg-blue-500 hover:text-white">Matched</button>
      <button className="bg-white ml-2 text-black border border-black py-1 px-7 text-sm rounded-full hover:bg-blue-500 hover:text-white">Recent</button>
      <button className="bg-white ml-2 text-black border border-black py-1 px-7 text-sm rounded-full hover:bg-blue-500 hover:text-white">Saved</button>
    </div>
  );
};

export default MiniNav;
