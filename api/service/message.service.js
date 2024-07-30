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
                message
            }
            const newMessage=await messageRepository.create(updateData)
           
            console.log('new msg:',newMessage)
            conversation.messages.push(newMessage._id)
    
            await conversationRepository.saveMessageId(conversation)
            //socket io functionality to send message in real time
            const receiverSocketId=getReceiverSocketId(receiverId)
            console.log('rcid:',receiverSocketId)
            if(receiverSocketId){
                io.to(receiverSocketId).emit("newMessage",newMessage)   //send event to specific client
            }
            return newMessage
    }

    
    async getConversation(senderId,receiverId){
        
        return await conversationRepository.findMessages(senderId,receiverId)
    }
}

export default new messageService()