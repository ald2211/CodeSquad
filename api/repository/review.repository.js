import Review from "../models/review.modal.js";
import mongoose from 'mongoose'; 
class reviewRepository{
    async create(reviewData) {
        const newReview = new Review(reviewData);
        return await newReview.save();
      }

      async findAllReviewsByUserId(userId) {
        const result= await Review.find({userId}).populate('reviewer');
        return result.map(userReview => ({
          id: userReview._id,
          content: userReview.review,
          rating: userReview.rating,
          date: userReview?.date,
          reviewerDetails: {
            author: userReview.reviewer.name,
            authorPhoto: userReview.reviewer.avatar,
            authorJob: userReview.reviewer.jobRole,
          }
        }));
      }

      async findAverageRatingByUserId(userId) {
        const results = await Review.aggregate([
            {
                $match: { userId } 
            },
            {
                $group: {
                    _id: "$userId",
                    averageRating: { $avg: "$rating" }
                }
            },
            {
                $project: {
                    _id: 0,
                    userId: "$_id",
                    averageRating: { $round: ["$averageRating", 0] } 
                }
            }
        ]);
    
        return results.length > 0 ? results[0].averageRating : 0;
    }

    
    async findByReviewIdAndUpdate(reviewId, updatedData) {
      return await Review.findByIdAndUpdate(
        reviewId,
        { $set: updatedData },
        { new: true }
      );
    }

    async findByReviewIdAndDelete(reviewId){
      
       await Review.findByIdAndDelete(reviewId);
    }
    
}

export default new reviewRepository()