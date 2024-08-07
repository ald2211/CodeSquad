import mongoose from "mongoose";

export const reviewSchema=new mongoose.Schema({

    userId:{
        type:String,
    },
    reviewer:{
        type:String,
        ref:"User"
    },
    rating:{
        type:Number,
        default:0
    },
    review:{
        type:String
    }
},{timestamps:true})

export default mongoose.model('review',reviewSchema)