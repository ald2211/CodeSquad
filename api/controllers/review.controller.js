import reviewService from "../service/review.service.js";

export const submitReview=async(req,res,next)=>{
    try {
        
       const data=await reviewService.addReview(req.user.role,req.body)
        res.status(200).json({
          success: true,
          message: "review Submitted Successfully",
          data
        });
      } catch (err) {
        console.log("review add error:", err);
        next(err);
      }
}


export const editReviewAndRating=async(req,res,next)=>{
  try {
      
     await reviewService.editUserReviewAndRating(req.body)
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      console.log("review add error:", err);
      next(err);
    }
}


export const deleteReviewAndRating=async(req,res,next)=>{
  try {
      
     await reviewService.deleteUserReviewAndRating(req.body)
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      console.log("review delete error:", err);
      next(err);
    }
}


export const getAllReviews=async(req,res,next)=>{
  try {
      
     const reviews=await reviewService.getUserReviews(req.params.id)
     console.log('reviews:',reviews)
      res.status(200).json({
        success: true,
        reviews,
      });
    } catch (err) {
      console.log("review add error:", err);
      next(err);
    }    
}


export const getAvgRating=async(req,res,next)=>{
  try {
      
     const rating=await reviewService.getUserAvgRating(req.params.id)
     console.log('avg rating:',rating)
      res.status(200).json({
        success: true,
        rating,
      });
    } catch (err) {
      console.log("avg rating error:", err);
      next(err);
    }

    
    
}