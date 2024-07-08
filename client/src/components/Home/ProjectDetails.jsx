import React, { useState } from 'react';
import { CiBookmark } from "react-icons/ci";

const ProjectDetails = () => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className="relative p-4 mb-4 border-t-[1px] border-b-[1px] border-black bg-white">
      <button className="absolute top-2 right-2">
        <CiBookmark className="text-gray-600 w-6 h-6 hover:text-blue-600" />
      </button>
      <h3 className="text-xl font-semibold mb-2">Project Name</h3>
      <p className="text-gray-600 mb-2 flex justify-between text-sm"><span>2023-07-01</span> <span>Budget: ₹1000 - ₹4000</span></p>
      <p className="text-gray-600 mb-2 text-sm">
        {isDescriptionExpanded ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit.fdsfdsafdsffsfffsfsfsf" : "Lorem ipsum dolor sit amet..."}
        <button onClick={toggleDescription} className="text-blue-500 ml-2 text-sm">
          {isDescriptionExpanded ? "Read Less" : "Read More"}
        </button>
      </p>
      <div className="text-gray-600 mb-3 flex text-sm justify-between">
        <p>Bid Ends Date: 2023-07-15</p>
        <p>Total Bids: 10</p>
      </div>
      <div className="flex justify-end mt-4">
      <button className="bg-white ml-2 text-black border border-black py-1 px-7 text-sm rounded-full hover:bg-blue-500 hover:text-white">Show Bids</button>
      <button className="bg-white ml-2 text-black border border-black py-1 px-7 text-sm rounded-full hover:bg-blue-500 hover:text-white">Place a Bid</button>
      </div>
    </div>
  );
};

export default ProjectDetails;
