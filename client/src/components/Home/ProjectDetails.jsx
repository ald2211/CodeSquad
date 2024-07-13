import React, { useEffect, useState } from 'react';
import { CiBookmark } from "react-icons/ci";
import BidsModal from "./BidsModal";
import AddProjectModal from "./AddProjectModal"; // Import the modal
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { updateWorkSuccess } from '../../Redux/user/userSlice';
import { getClientsAllWorks } from '../../api/service';

const ProjectDetails = () => {
  const { currentUser, userWorks } = useSelector((state) => state.user);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null); // State for project to edit
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWorks = async () => {
      const res = await getClientsAllWorks();
      dispatch(updateWorkSuccess(res.data.data));
    };
    fetchWorks();
  }, [dispatch]);

  const handleShowEditProject = (project) => {
    setProjectToEdit(project);
    setShowEditProjectModal(true);
  };

  const handleCloseEditProjectModal = () => {
    setShowEditProjectModal(false);
    setProjectToEdit(null); // Reset the project to edit
  };

  const handleShowBids = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  if (userWorks.length === 0) {
    return <div>No works</div>;
  }

  return (
    <>
      {userWorks?.map((work) => (
        <div key={work.workId} className="relative p-6 mb-6 border border-gray-300 rounded-lg bg-white shadow-md w-full max-w-4xl mx-auto">
          {currentUser.data.role === 'developer' ? (
            <button className="absolute top-4 right-4">
              <CiBookmark className="text-gray-600 w-6 h-6 hover:text-blue-600" />
            </button>
          ) : (
            <div className="absolute top-4 right-4 flex space-x-2">
              <button onClick={() => handleShowEditProject(work)}>
                <FiEdit className="text-gray-600 w-5 h-5 hover:text-blue-600" />
              </button>
              <button>
                <MdDeleteOutline className="text-gray-600 w-6 h-6 hover:text-red-600" />
              </button>
            </div>
          )}
          <h3 className="text-xl font-semibold mb-4">{work.workName}</h3>
          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <span>{work.bidStartDate.split('T')[0]}</span>
            <span>Type:{work.workType}<br/>Budget: {work.budget}</span>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            {isDescriptionExpanded ? work.description : `${work.description.slice(0, 100)}...`}
           { work.description.length>100&&<button onClick={toggleDescription} className="text-blue-500 ml-2 text-sm">
              {isDescriptionExpanded ? "Read Less" : "Read More"}
            </button>}
          </p>
          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <p>Bid Ends: {work.bidEndDate.split('T')[0]}</p>
            <p>Total Bids: {work.bidsCount}</p>
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
              projectName={work.workName}
              bidEndDate={work.bidEndDate}
              handleCloseModal={handleCloseModal}
            />
          )}
        </div>
      ))}
      {showEditProjectModal && (
        <AddProjectModal
          isOpen={showEditProjectModal}
          handleClose={handleCloseEditProjectModal}
          isAddMode={false} // Set to edit mode
          selectedWork={projectToEdit} // Pass project to edit
        />
      )}
    </>
  );
};

export default ProjectDetails;
