import Conversation from "../models/conversation.model.js"

class conversationRepository{

    async findConversationByParticipants(senderId,receiverId){
        
        return await Conversation.findOne({participants:{$all:[senderId,receiverId]}})
    }
    async findMessages(senderId,receiverId){
        
        return await Conversation.findOne({participants:{$all:[senderId,receiverId]}}).populate('messages')
    }
    
    async create(senderId,receiverId){

        const newConversation= new Conversation({participants:[senderId,receiverId]})
        
        return await newConversation.save()
    }

    async saveMessageId(updatedConversation){

        await updatedConversation.save()
    }
}

export default new conversationRepository()