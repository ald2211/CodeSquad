import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddProjectModal from './AddProjectModal';

const MiniNav = () => {
    const {currentUser}=useSelector((state)=>state.user)
    const [showAddProjectModal, setShowAddProjectModal] = useState(false);

    const handleShowAddProject = () => {
        setShowAddProjectModal(true);
      };
    
      const handleCloseAddProjectModal = () => {
        setShowAddProjectModal(false);
      };

      
  return (
    <div className="flex justify-start mb-4">
      {currentUser.data.role==='developer'?
        <>
        <button className="bg-white ml-2 text-black border border-black py-1 px-7 text-sm rounded-full hover:bg-blue-500 hover:text-white">Matched</button>
        <button className="bg-white ml-2 text-black border border-black py-1 px-7 text-sm rounded-full hover:bg-blue-500 hover:text-white">Recent</button>
        <button className="bg-white ml-2 text-black border border-black py-1 px-7 text-sm rounded-full hover:bg-blue-500 hover:text-white">Saved</button> 
        </>
        :
        <>
        <button onClick={handleShowAddProject} className="bg-white ml-2 text-black border border-black py-1 px-7 text-sm rounded-full hover:bg-blue-500 hover:text-white">Add Project</button> 
        {showAddProjectModal && (
            <AddProjectModal
              isOpen={showAddProjectModal}
              handleClose={handleCloseAddProjectModal}
              isAddMode={true}
            />
          )}
          </>
     }
    </div>
  );
};

export default MiniNav;
