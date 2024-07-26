import reviewService from "../service/review.service.js";

export const submitReview=async(req,res,next)=>{
    try {
        
       await reviewService.addReview(req.user.role,req.body)
        res.status(200).json({
          success: true,
          message: "review Submitted Successfully",
        });
      } catch (err) {
        console.log("review add error:", err);
        next(err);
      }
}