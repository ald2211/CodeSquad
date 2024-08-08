import adminService from "../service/admin.service.js";


export const getAllUsers=async(req,res,next)=>{

    try{
        const page = parseInt(req.query.page) || 1;  
        const limit = parseInt(req.query.limit) || 10;  
        const search= req.query.search || ""
        const {count,users}=await adminService.findAllUsers(page,limit,search);
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

export const updateProjectState=async(req,res,next)=>{
    try{
       
        await adminService.updateWorkStatus(req.params.id)
        res.status(200).json({success:true,message:'Project Status updated successfully'})

    }catch(err){
        next(err)
    }
}


export const findAllUserWorks=async(req,res,next)=>{

    try{
        const page = parseInt(req.query.page) || 1;  
        const limit = parseInt(req.query.limit) || 10;  
        const search= req.query.search || ""
        const {count,data}=await adminService.findAllWorks(req.user.role,page,limit,search);
        res.status(200).json({
            success:true,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data
          });

    }catch(err){
        next(err)
    }
}

export const getDashBoardData=async(req,res,next)=>{

    try{
        const dashboardData=await adminService.getDashboardDetails();
        console.log('dassss:',dashboardData)
        res.status(200).json({
            success:true,
            dashboardData
          });

    }catch(err){
        next(err)
    }
}


export const findAllCompletedWorks=async(req,res,next)=>{

    try{
        const page = parseInt(req.query.page) || 1;  
        const limit = parseInt(req.query.limit) || 10;  
        const search= req.query.search || ""
        const {count,data}=await adminService.findCompletedWorks(req.user.role,page,limit,search);
        res.status(200).json({
            success:true,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data
          });

    }catch(err){
        next(err)
    }
}