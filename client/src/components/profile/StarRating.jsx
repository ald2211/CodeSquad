import React from 'react';

const StarRating = ({ rating }) => {
  // Create an array of 5 elements
  const stars = Array(5).fill(0);

  return (
    <div className="flex space-x-1 md:mr-3">
      {stars.map((_, index) => (
        <span
          key={index}
          className={`text-3xl mb-2   md:text-4xl ${
            index < rating ? 'text-yellow-500' : 'text-gray-300'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
