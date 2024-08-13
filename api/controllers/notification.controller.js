import notificationService from "../service/notification.service.js";

export const getNotification=async(req,res,next)=>{

    try{
        const notifications=await notificationService.getUserNotification(req.user.id)
        console.log('notifcations:',notifications)
        res.status(200).json({success:true,notifications})
    }catch(err){
        console.log('get notification err:',err)
        next(err)
    }
}

export const deleteSingleNotification=async(req,res,next)=>{

    try{                                                
        const notification=await notificationService.deleteSpecificNotification(req.params.id)
        console.log('deleted single:',notification)
        res.status(200).json({success:true,notification})
    }catch(err){
        console.log('delete single notification err:',err)
        next(err)
    }
}

export const deleteAllNotification=async(req,res,next)=>{

    try{
        await notificationService.deleteUsersAllNotification(req.user.id)
        res.status(200).json({success:true})
    }catch(err){
        console.log('delete all notification err:',err)
        next(err)
    }
}