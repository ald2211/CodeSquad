import Review from "../models/review.modal.js";

class reviewRepository{
    async create(reviewData) {
        const newReview = new Review(reviewData);
        return await newReview.save();
      }
}

export default new reviewRepository()