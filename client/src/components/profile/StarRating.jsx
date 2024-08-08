import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAvgRating } from '../../api/service';

const StarRating = () => {
  const stars = Array(5).fill(0);
  const [rating,setRating]=useState(0)
  const{currentUser}=useSelector((state)=>state.user)
  useEffect(() => {
    const fetchAvgRating = async () => {
      try {
        const res = await getAvgRating(currentUser.data._id);
        console.log('avg rating:', res.data.rating);
        setRating(res.data.rating);
      } catch (err) {
        console.log('dashboard data fetch error:', err);
      }
    };

    fetchAvgRating();
  }, []);

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
