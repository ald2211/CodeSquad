import adminService from "../service/admin.service.js";


export const getAllUsers=async(req,res,next)=>{

    try{
        const page = parseInt(req.query.page) || 1;  // Current page number, default to 1
        const limit = parseInt(req.query.limit) || 10;  // Number of items per page, default to 10
        const {count,users}=await adminService.findAllUsers(page,limit);
        res.status(200).json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: users,
          });

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