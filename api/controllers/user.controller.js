import User from "../models/user.model.js"
import { errorHandler } from "../utils/customError.js"






export const updateUserProfile=async(req,res,next)=>{
   
    if(req.user.id !==req.params.id)return next(errorHandler('401','unAuthorized'))
    
    try{
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{
            $set:{
                avatar:req.body.avatar,
                rph:req.body.rph,
                jobRole:req.body.userRole,
                resume:req.file?.filename

            }
        },{new:true})

        const {password,...rest}=updatedUser._doc

        res.status(201).json({success:true,message:'updated successfully','user':rest})

    }catch(err){
        console.log('errorAt server:',err)
        next(err)
    }

}