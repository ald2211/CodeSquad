import React, { useState } from 'react';
import { CiBookmark } from "react-icons/ci";
import BidsModal from "./BidsModal";
import { useSelector } from 'react-redux';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const ProjectDetails = ({ id, projectName, postedDate, description, budget, bidEndDate, totalBids }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShowBids = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className="relative p-6 mb-6 border border-gray-300 rounded-lg bg-white shadow-md w-full max-w-4xl mx-auto">
      {currentUser.data.role === 'developer' ? (
        <button className="absolute top-4 right-4">
          <CiBookmark className="text-gray-600 w-6 h-6 hover:text-blue-600" />
        </button>
      ) : (
        <div className="absolute top-4 right-4 flex space-x-2">
          <button>
            <FiEdit className="text-gray-600 w-5 h-5 hover:text-blue-600" />
          </button>
          <button>
            <MdDeleteOutline className="text-gray-600 w-6 h-6 hover:text-red-600" />
          </button>
        </div>
      )}
      <h3 className="text-xl font-semibold mb-4">{projectName}</h3>
      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <span>{postedDate}</span>
        <span>Budget: {budget}</span>
      </div>
      <p className="text-gray-600 mb-4 text-sm">
        {isDescriptionExpanded ? description : `${description.slice(0, 100)}...`}
        <button onClick={toggleDescription} className="text-blue-500 ml-2 text-sm">
          {isDescriptionExpanded ? "Read Less" : "Read More"}
        </button>
      </p>
      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <p>Bid Ends: {bidEndDate}</p>
        <p>Total Bids: {totalBids}</p>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleShowBids}
          className="bg-white text-black border border-black py-1 px-7 text-sm rounded-full hover:bg-blue-500 hover:text-white"
        >
          Show Bids
        </button>
        {currentUser.data.role === 'developer' && (
          <button className="bg-white text-black border border-black py-1 px-7 text-sm rounded-full hover:bg-blue-500 hover:text-white">
            Place a Bid
          </button>
        )}
      </div>
      {showModal && (
        <BidsModal
          projectName={projectName}
          bidEndDate={bidEndDate}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProjectDetails;
