import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfileBox = () => {
  const navigate = useNavigate();
  const { currentUser, currentEducation , currentExperience, currentProjects} = useSelector((state) => state.user);
  
  let count=0
  if (currentEducation?.data?.length > 0) count+=1;
  if (currentProjects?.data?.length > 0) count+=1;
  if (currentExperience?.data?.length > 0) count+=1;

  let progressWidth = '40%'; // Default to 40% if count is 0
  if (count === 1) progressWidth = '60%';
  if (count === 2) progressWidth = '80%';
  if (count === 3) progressWidth = '100%';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col items-center">
      <img 
        src={currentUser?.data?.avatar} 
        alt="Profile" 
        className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 mb-4 hover:opacity-85 cursor-pointer" 
        onClick={() => navigate('/profile')}
      />
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{currentUser?.data?.name}</h3>
      <p className="text-gray-600 text-sm mb-4">{currentUser?.data?.role}</p>
      <div className="w-full">
        <span className="text-sm text-gray-600">Profile</span>
        <div className="bg-gray-300 h-2 rounded-full mt-1">
          <div className="bg-blue-600 h-full rounded-full" style={{ width: progressWidth }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
