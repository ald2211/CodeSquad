import userService from "../service/user.service.js";
import { errorHandler } from "../utils/customError.js";

export const updateUserProfile = async (req, res, next) => {
  if (req.user.id !== req.params.id)return next(errorHandler("401", "unAuthorized"));
  console.log('reached')

  try {
   const updatedUserProfile=await userService.updateUserProfile( req.params.id,req.body)
    res
      .status(201)
      .json({ success: true, message: "updated successfully", data: updatedUserProfile });
  } catch (err) {
    console.log("errorAt server:", err);
    next(err);
  }
};

export const getUserInfo =async (req,res,next)=>{

  try {
    const userInfo=await userService.getUserInfo( req.user.id)
    console.log('userInfo:',userInfo)
     res
       .status(201)
       .json({ success: true, message: "user fetched successfully", data: userInfo });
   } catch (err) {
     console.log("errorAt server:", err);
     next(err);
   }
}
