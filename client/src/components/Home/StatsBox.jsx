import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAvgRating, getStatusBoxData } from "../../api/service";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StatsBox = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const [rating, setRating] = useState(0);

  useEffect(() => {
    getStatusBoxData(currentUser.data._id, currentUser.data.role)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => err);

    const fetchAvgRating = async () => {
      try {
        const res = await getAvgRating(currentUser.data._id);
        setRating(res.data.rating);
      } catch (err) {}
    };

    fetchAvgRating();
  }, [currentUser.data._id, currentUser.data.role]);

  // Function to render stars based on the rating
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex justify-center">
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <FaStar key={index} className="text-yellow-500" />
          ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <FaRegStar key={index} className="text-yellow-500" />
          ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="grid lg:grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-600 mb-2 text-center">
            {currentUser.data.role === "developer"
              ? "Committed Projects"
              : "Works Created"}
          </p>
          <p className="text-2xl font-bold text-center text-blue-600">
            {data?.committedProjects}
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-center mb-2">
            {currentUser.data.role === "developer"
              ? "Completed Projects"
              : "Works Completed"}
          </p>
          <p className="text-2xl font-bold text-center text-green-600">
            {data?.completedProjects}
          </p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-center mb-2">Rating</p>
          {renderStars()}
          <p className="text-lg font-bold text-center text-yellow-600 mt-2">
            {rating} / 5
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(StatsBox);
