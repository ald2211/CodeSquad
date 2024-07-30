import mongoose from 'mongoose';

const messageSchema=new mongoose.Schema({

    senderId:{
        type:String,
        ref:"user",
        required:true
    },
    receiverId:{
        type:String,
        ref:"user",
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model('message',messageSchema)