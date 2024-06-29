import education from "../models/education.model.js"
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
                resume:req.file?.filename,
                summary:req.body.summary,
                skills:req.body.skills

            }
        },{new:true})

        const {password,...rest}=updatedUser._doc

        res.status(201).json({success:true,message:'updated successfully','user':rest})

    }catch(err){
        console.log('errorAt server:',err)
        next(err)
    }

}


export const getEducation=async(req,res,next)=>{

    try {
       
        const userEducation = await education.aggregate([{$match:{ userId:req.user.id }}]);
        res.status(200).json({
            success: true,
            message: 'Details fetched successfully',
            data: userEducation
          });
      } catch (err) {
        next(err)
      }
}

export const addEducation=async(req,res,next)=>{

    if(req.user.id !==req.params.id)return next(errorHandler(401,'unAuthorized'))
        
        try{
             // Check for duplicate education entries
             console.log('body:',req.body)
             const existingEducation = await education.aggregate([
                {
                  $match: {
                    userId: req.user.id,
                    courseName: req.body.courseName,
                    collegeName: req.body.collegeName,
                    
                  }
                }
              ]);


  console.log('existingEducation:',existingEducation)

      if (existingEducation && existingEducation.length>0) return next(errorHandler(400,'This education entry already exists' ));
              const newEducation=new education({
                userId: req.user.id,
                courseName:req.body.courseName,
                collegeName:req.body.collegeName,
                country:req.body.country,
                startDate: new Date(req.body.startDate),
                endDate: new Date(req.body.endDate),
            })


            await newEducation.save()
            const userEducation = await education.aggregate([{$match:{ userId:req.user.id }}]);
            res.status(200).json({success:true,message:'new education added',data:userEducation})
        }catch(err){
            console.log('educationUploadError:',err)
            next(err)
        }
}

export const editEducation=async(req,res,next)=>{


  try {
    const existEducation = await education.findOne({ _id: req.params.edu_id, userId: req.params.user_id });

    if (!existEducation)return next(errorHandler(404,'Education entry not found'))

    const updatedEducation=await education.findByIdAndUpdate(req.params.edu_id,{
        $set:{
            
            courseName:req.body.courseName,
            collegeName:req.body.collegeName,
            country:req.body.country,
            startDate: req.body.startDate,
            endDate: req.body.endDate

        }
    },{new:true})
    await updatedEducation.save();

    const userEducation = await education.aggregate([{$match:{ userId:req.user.id }}]);

    res.status(200).json({success:true,message:'Education updated successfully',data:userEducation})
  } catch (err) {
    console.log('updationError:',err)
    next(err)
  }
}

export const deleteEducation=async(req,res,next)=>{
    try {
        const educationToRemove = await education.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    
        if (!educationToRemove) return next(errorHandler(404, 'Education entry not found'));
        
        const userEducation = await education.aggregate([{$match:{ userId:req.user.id }}]);
        res.status(200).json({success:true,message:'education updated',data:userEducation})

      } catch (err) {
        console.log('error:',err)
        next(err)
      }
}