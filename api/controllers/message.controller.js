import messageService from "../service/message.service.js";

export const sendMessage=async(req,res,next)=>{
    try{
    
        const newMessage=await messageService.userSendMessage(req.user.id,req.params.id,req.body.message)
        res.status(201).json({success:true,newMessage})

    }catch(err){

        console.log('message error:',err)
    }
}

export const getMessages=async(req,res,next)=>{
    try{
        console.log('ids:',req.params.id)
        const conversation=await messageService.getConversation(req.user.id,req.params.id)
        console.log('conversssss:',conversation)
        if(!conversation)return res.status(200).json({success:true,messages:[]})
        res.status(200).json({success:true,messages:conversation.messages})

    }catch(err){

        console.log('message error:',err)
    }
}