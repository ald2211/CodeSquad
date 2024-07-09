import adminService from "../service/admin.service.js";


export const getAllUsers=async(req,res,next)=>{

    try{
        const result=await adminService.findAllUsers();
    res.status(200).json({success:true,message:'users details fetched successfully',data:result})

    }catch(err){
        next(err)
    }
    
}

export const updateUserState=async(req,res,next)=>{

    try{
       
        const result=await adminService.updateUserStatus(req.params.id,req.body)
        console.log('result:',result)
        res.status(200).json({success:true,message:'user state updated successfully',userState:result})

    }catch(err){
        next(err)
    }
}