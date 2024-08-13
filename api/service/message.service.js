import conversationRepository from "../repository/conversation.repository.js"
import messageRepository from "../repository/message.repository.js"
import { getReceiverSocketId, io } from "../socket/socket.js"
import { errorHandler } from "../utils/customError.js"

class messageService{

    async userSendMessage(senderId,receiverId,message){
        
        let conversation=await conversationRepository.findConversationByParticipants(senderId,receiverId)
        console.log('convers at service:',conversation)
        if(!conversation){
            conversation=await conversationRepository.create(senderId,receiverId)
            console.log('new converssss from conv rep:',conversation)
            if(!conversation)throw errorHandler(500,'Internal server error')
        }
            let updateData={
                senderId,
                receiverId,
                message,
                read:false
            }
            const newMessage=await messageRepository.create(updateData)
           
           
            conversation.messages.push(newMessage._id)
                
             //socket io functionality to send message in real time
             const receiverSocketId=getReceiverSocketId(receiverId)

             if(receiverSocketId){
                 io.to(receiverSocketId).emit("newMessage",newMessage)   //send event to specific client
             }
             
            const currentUnreadCount = conversation.unreadCount.get(receiverId) || 0;
            conversation.unreadCount.set(receiverId, currentUnreadCount + 1);
           
            
            
        
            console.log('rcid:',receiverSocketId)

            await conversationRepository.saveMessageId(conversation)
           
            
            return newMessage
    }

    
    async getConversation(senderId,receiverId){
        
        const userConversation= await conversationRepository.findMessages(senderId,receiverId)
        
         // Mark all messages as read
         if(userConversation){

            const messageIds = userConversation.messages.map(message => message._id);
            await messageRepository.updateMany(messageIds,senderId);
       
            // Reset unread count for this user
            userConversation.unreadCount.set(senderId, 0);
            await conversationRepository.saveMessageId(userConversation)
         }
        

         return userConversation
    }

    async getUnreadMessages(receiverId){

        return await conversationRepository.findUnreadMessages(receiverId)
    }

    async markRead(id,userId){
        const message=await messageRepository.findByMessageIdAndUpdate(id)
        // console.log('message:',message)
        const userConversation= await conversationRepository.findByMessageId(message._id)
        console.log('user conversation:',userConversation)
        console.log('userId:',userId)
        userConversation.unreadCount.set(userId,0);
        await conversationRepository.saveMessageId(userConversation)
    }
    
}

export default new messageService()