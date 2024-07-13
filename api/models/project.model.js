import mongoose from "mongoose";

const projectSchema=new mongoose.Schema({

    clientId:{

        type:String,
        ref:'user',
        required:true
    },
    projectName:{
        
        type:String,
        required:true
    },
    projectSummary:{

        type:String,
        required:true
    }
    
})

export default mongoose.model('user_projects',projectSchema)