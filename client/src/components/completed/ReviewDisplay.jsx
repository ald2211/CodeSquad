import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { useState, useEffect } from 'react';
import EditReviewModal from './EditReviewModal';
import { useSelector } from 'react-redux';
import { Success } from '../../helper/popup';
import { editReviewAndRating,deleteReviewAndRating } from '../../api/service';
import { FaStar } from 'react-icons/fa';
import DeleteReviewModal from './DeleteReviewModal';

const ReviewDisplay = ({ work,completed,setCompleted,uniqueId }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [reviewData, setReviewData] = useState({});
    const [isReviewExpanded, setIsReviewExpanded] = useState(false);

    useEffect(() => {
        if (currentUser.data.role === 'client') {
            setReviewData(work.clientReview);
        } else {
            setReviewData(work.developerReview);
        }
    }, [work, currentUser]);

    const handleEditClick = () => {
        setEditModalOpen(true);
    };

    const handleDeleteClick = () => {
        setDeleteModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    const handleEditReviewSubmit = async (reviewId, editedReview, editedRating) => {
        try {
            const res = await editReviewAndRating(reviewId, editedReview, editedRating);
            if (res.data.success) {
                setReviewData({ _id: reviewId, review: editedReview, rating: editedRating });
                Success('Review updated successfully');
                closeEditModal();
            }
        } catch (err) {
            console.log('Review edit error:', err);
        }
    };

    const handleDeleteConfirm = async() => {
        try {
            closeDeleteModal();
            const res = await deleteReviewAndRating(reviewData._id,work.workNumber);
            
            if (res.data.success) {
                const updatedWorkData = [...completed];
                if(currentUser.data.role==='client'){
                   updatedWorkData[uniqueId].clientReview = null;
                }else{
                   updatedWorkData[uniqueId].developerReview = null;
                }
              
               setCompleted(updatedWorkData);
               Success('Review deleted successfully');
           }
        } catch (err) {
            console.log('Review edit error:', err);
        }
    };

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
        <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <p className="text-lg font-semibold text-gray-800 mb-4">
    {reviewData?.review
        ? isReviewExpanded
            ? reviewData.review
            : `${reviewData.review.slice(0, 100)}`
        : ''}
    {reviewData?.review && reviewData.review.length > 100 && (
        <button
            onClick={() => setIsReviewExpanded(!isReviewExpanded)}
            className="text-blue-500 ml-2 text-sm"
        >
            {isReviewExpanded ? "Read Less" : "Read More"}
        </button>
    )}
</p>

            <div className="flex items-center justify-between">
                <p className="text-lg text-gray-600 flex items-center">
                    <strong>Rating:</strong>
                    <span className="ml-2">
                        {renderStars(reviewData?.rating)}
                    </span>
                </p>
                <div className="flex space-x-4 mb-10">
                    <button
                        className="text-blue-500 hover:text-blue-600 focus:outline-none transition duration-200"
                        onClick={handleEditClick}
                    >
                        <CiEdit className="h-6 w-6" />
                    </button>
                    <button
                        className="text-red-500 hover:text-red-600 focus:outline-none transition duration-200"
                        onClick={handleDeleteClick}
                    >
                        <MdDeleteOutline className="h-6 w-6" />
                    </button>
                </div>
            </div>
            {isEditModalOpen && (
                <EditReviewModal
                    review={reviewData}
                    onClose={closeEditModal}
                    onEdit={handleEditReviewSubmit}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteReviewModal
                    isOpen={isDeleteModalOpen}
                    onRequestClose={closeDeleteModal}
                    onDeleteConfirm={handleDeleteConfirm}
                />
            )}
        </div>
    );
};

export default ReviewDisplay;
