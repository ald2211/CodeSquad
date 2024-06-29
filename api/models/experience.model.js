import mongoose from "mongoose";

const experienceSchema=new mongoose.Schema({

    userId:{
        type:String,
        ref:'user',
        required:true
    },
    jobTitle:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
    
})


export default mongoose.model('userExperience',experienceSchema)