import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddProjectModal from "./AddProjectModal";

const MiniNav = ({ setMiniNavFilter }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  const handleShowAddProject = () => {
    setShowAddProjectModal(true);
  };

  const handleCloseAddProjectModal = () => {
    setShowAddProjectModal(false);
  };

  const handleFilterChange = (filterValue) => {
    if (filterValue === "recent") {
      setMiniNavFilter("recent");
    } else if (filterValue === "saved") {
      setMiniNavFilter("saved")("saved");
    } else {
      setMiniNavFilter("");
    }
  };

  return (
    <div className="flex justify-start mb-4">
      {currentUser.data.role === "developer" ? (
        <>
          <select
            className="bg-white ml-2 text-black border border-black px-1 py-1 text-sm rounded-md cursor-pointer "
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="projects">Preferred Projects</option>
            <option value="recent">Recently Added</option>
            <option value="saved">Saved Projects</option>
          </select>
        </>
      ) : (
        <>
          <button
            onClick={handleShowAddProject}
            className="bg-white ml-2 text-black border border-black py-1 px-7 text-sm rounded-full hover:bg-blue-500 hover:text-white"
          >
            Add Project
          </button>
          {showAddProjectModal && (
            <AddProjectModal
              isOpen={showAddProjectModal}
              handleClose={handleCloseAddProjectModal}
              isAddMode={true}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MiniNav;
