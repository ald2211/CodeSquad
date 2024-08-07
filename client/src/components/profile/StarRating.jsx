import React from 'react';
import { useSelector } from 'react-redux';

const StarRating = () => {
  const {currentUser}=useSelector((state)=>state.user)
  const stars = Array(5).fill(0);

  return (
    <div className="flex space-x-1 md:mr-3">
      {stars.map((_, index) => (
        <span
          key={index}
          className={`text-3xl mb-2   md:text-4xl ${
            index < currentUser?.data?.averageRating ? 'text-yellow-500' : 'text-gray-300'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
