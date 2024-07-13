import React, { useEffect, useState } from 'react';
import Modal from "react-modal";
import { CiBookmark } from "react-icons/ci";
import BidsModal from "./BidsModal";
import AddProjectModal from "./AddProjectModal"; // Import the modal
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { updateWorkSuccess } from '../../Redux/user/userSlice';
import { deleteClientWork, getClientsAllWorks } from '../../api/service';
import { Success } from '../../helper/popup';

const ProjectDetails = () => {
  const { currentUser, userWorks } = useSelector((state) => state.user);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null); // State for project to edit
  const dispatch = useDispatch();
  const [selectedId,setSelectedId]=useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const openDeleteModal = (workNumber) => {
    setSelectedId(workNumber)
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedId(null)
    setIsDeleteModalOpen(false);
  };
  const handleDelete = async (workNumber) => {
    try {
      closeDeleteModal()
      const res=await deleteClientWork(workNumber)
      dispatch(updateWorkSuccess(res.data.data))
      Success(res.data.message);
    } catch (err) {
      console.log(err)
    }
  };


  if (userWorks.length === 0) {
    return <div className=" flex flex-col items-center relative p-6 mb-6 border border-gray-300 rounded-lg bg-white shadow-md w-full max-w-4xl mx-auto">
    <svg className="w-12 h-12 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16h8M8 12h8M9 20h6a2 2 0 002-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
    </svg>
    <p class="text-gray-600 text-center">You have no Project yet</p>
  </div>
  
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
                <MdDeleteOutline onClick={() => openDeleteModal(work.workNumber)} className="text-gray-600 w-6 h-6 hover:text-red-600" />
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
       {/* delete Modal */}
       <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={closeDeleteModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this project?
              </h3>
              <button
                onClick={()=>handleDelete(selectedId)}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={closeDeleteModal}
                type="button"
                className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProjectDetails;
