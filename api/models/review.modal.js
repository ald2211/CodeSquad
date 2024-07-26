import mongoose from "mongoose";

export const reviewSchema=new mongoose.Schema({

    userId:{
        type:String,
        ref:"user"
    },
    reviewer:{
        type:String,
        ref:"user"
    },
    rating:{
        type:Number,
        default:0
    },
    review:{
        type:String
    }
})

export default mongoose.model('review',reviewSchema)