import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({

  paymentId: {
    type: String,
  },
  clientPayment: {
    type: String,
    default:'pending'
  },
  developerPayment: {
    type: String,
    default:'pending'
  },
  finalAmount: {
    type: Number
  },
  upi:{
    type:String
  }
},{timestamps:true});

export default mongoose.model('Payment', paymentSchema);

