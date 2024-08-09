import { useState } from 'react';
import { useSelector } from 'react-redux';

const EditReviewModal = ({ review, onClose,onEdit}) => {
    const [editedReview, setEditedReview] = useState(review.review);
    const [editedRating, setEditedRating] = useState(review.rating);

    const handleSave = async() => {
         onEdit(review._id,editedReview, editedRating);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Edit Review</h2>
                <textarea
                    value={editedReview}
                    onChange={(e) => setEditedReview(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="number"
                    value={editedRating}
                    onChange={(e) => setEditedRating(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    max="5"
                    min="1"
                />
                <div className="flex justify-end space-x-4">
                    <button 
                        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded" 
                        onClick={onClose}>
                        Cancel
                    </button>
                    <button 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" 
                        onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditReviewModal;
