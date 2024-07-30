import Message from "../models/message.model.js"

class messageReopository{

     async create(messageData){

        const newMessage= new Message(messageData)
        return await newMessage.save();
    }
}


export default new messageReopository()