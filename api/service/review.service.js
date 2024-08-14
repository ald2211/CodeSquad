import reviewRepository from "../repository/review.repository.js";
import workRepository from "../repository/work.repository.js";
import { errorHandler } from "../utils/customError.js";

class reviewService {
  async addReview(role, reviewData) {
    const result = await reviewRepository.create(reviewData.review);

    if (!result) throw errorHandler(400, "some error at server");
    let updateData = {};
    if (role === "client") {
      updateData.clientReview = result._id;
    } else {
      updateData.developerReview = result._id;
    }
    const updateWork = await workRepository.findByWorkIdAndUpdate(
      reviewData.workId,
      updateData
    );
    if (!updateWork) throw errorHandler(400, "some error at server");
    return result;
  }

  async editUserReviewAndRating(reviewData) {
    let updateData = {
      review: reviewData.editedReview,
      rating: reviewData.editedRating,
    };
    return await reviewRepository.findByReviewIdAndUpdate(
      reviewData.reviewId,
      updateData
    );
  }

  async deleteUserReviewAndRating(reviewData) {
    await reviewRepository.findByReviewIdAndDelete(reviewData.reviewId);
  }

  async getUserReviews(userId) {
    return await reviewRepository.findAllReviewsByUserId(userId);
  }

  async getUserAvgRating(userId) {
    return await reviewRepository.findAverageRatingByUserId(userId);
  }
}

export default new reviewService();
