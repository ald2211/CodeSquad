import messageService from "../service/message.service.js";

export const sendMessage=async(req,res,next)=>{
    try{
    
        const newMessage=await messageService.userSendMessage(req.user.id,req.params.id,req.body.message)
        res.status(201).json({success:true,newMessage})

    }catch(err){
        console.log('message error:',err)
        next(err)
    }
}

export const getMessages=async(req,res,next)=>{
    try{
        const conversation=await messageService.getConversation(req.user.id,req.params.id)
        if(!conversation)return res.status(200).json({success:true,messages:[]})
        res.status(200).json({success:true,messages:conversation.messages})

    }catch(err){

        console.log('message error:',err)
    }
}


export const markMessageAsRead= async (req, res,next) => {
    try {
        await messageService.markRead(req.body.messageId,req.user.id)
       
        res.json({ success: true });
    } catch (err) {
        console.log('mark as read err:',err);
        next(err)
    }
};

export const unreadMessages=async (req,res,next)=>{

    try{
        const unreadMessages=await messageService.getUnreadMessages(req.user.id)
        return res.status(200).json({success:true,unreadMessages})
    }catch(err){
        console.log(err)
        next(err)
    }
}

