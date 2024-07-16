import mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
  workNumber: {
    type: String,
    required: true,
    unique:true
  },
  clientId: { 
    type: String,
    ref: 'User',
    required: true
  },
  developerId: {
    type: String,
    ref: 'User',
  },
  workName: {
    type: String,
    required: true
  },
  workType: {
    type: String,
    required: true,
    default: 'fixed'
  },
  budget: {
    type: Number,
    required: true
  },
  bidEndDate: {
    type: Date,
    required: true
  },
  bidsCount: {
    type: Number,
    required: true,
    default: 0
  },
  description: {
    type: String,
    required: true
  },
  attachMents: {
    type: String
  },
  workStatus: {
    type: String,
    default: 'pending'
  },
  bookMarks: [{
    type: String,
    ref: 'user'
  }],
  bids: [
    {
      developer: {
        type: String,
        ref: 'user',
      },
      developerName:{
        type:String
      },
      developerPhoto:{
        type:String
      },
      completedProjects:{
        type:Number
      },
      bidAmount: {
        type: Number,
      },
      deliveryTime: {
        type: Number,
      },
    },
  ],

},{timestamps:true});

export default mongoose.model('Work',workSchema);
