import React from 'react';
import { useSelector } from 'react-redux';

const ProfileBox = () => {
    const {currentUser}=useSelector((state)=>state.user)
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <div className="flex items-center mb-4">
        <img src={currentUser.data.avatar} alt="Profile" className="w-28 h-28 object-cover rounded-full mr-4" />
        <div>
          <h3 className="text-xl font-bold mb-1">John Doe</h3>
          <p className="text-gray-600 text-xs mb-1">Full Stack Developer</p>
          <span className='text-sm text-gray-600'>Profile</span>
          <div className="bg-gray-200 h-2 rounded-full">
            <div className="bg-blue-500 h-full rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
