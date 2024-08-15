import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getReviews } from "../../api/service";
import { FaStar } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";

const ShowReview = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading,setReviewsLoading]=useState(false)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setReviewsLoading(true)
        const res = await getReviews(currentUser.data._id);
        setReviews(res.data.reviews);
      } catch (error) {
        error;
      } finally{
        setReviewsLoading(false)
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <div className="flex">
        {Array.from({ length: totalStars }, (_, index) => (
          <FaStar
            key={index}
            className={index < rating ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4 relative">
  <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
  
  {reviewsLoading ? (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#3333ff"
        ariaLabel="three-dots-loading"
      />
      <h1 className="text-xl font-semibold mt-4">Loading Reviews...</h1>
    </div>
  ) : (
    <>
      {reviews?.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review?.id}
            className="bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center mb-2">
              <img
                src={review?.reviewerDetails?.authorPhoto}
                alt={review?.reviewerDetails?.author}
                className="w-10 h-10 rounded-full mr-4 object-cover"
              />
              <div>
                <p className="text-lg font-semibold">
                  {review?.reviewerDetails?.author}
                </p>
                <p className="text-sm text-gray-500">
                  {review?.reviewerDetails?.authorJob}
                </p>
              </div>
            </div>
            <p className="text-gray-700 mb-2">{review?.content}</p>
            <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
              {renderStars(review?.rating)}
              <span>{new Date(review?.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </>
  )}
</div>

  );
};

export default React.memo(ShowReview);
