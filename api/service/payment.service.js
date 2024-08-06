import Razorpay from "razorpay";
import paymentRepository from "../repository/payment.repository.js";
import crypto from 'crypto'

class paymentService{

    async updateUpiId(paymentDetails){
        const updateData = {
            upi:paymentDetails.upi
          };
      
          const updatedPaymentDetails = await paymentRepository.findByPaymentIdAndUpdate(paymentDetails.paymentId, updateData);
      
          if (!updatedPaymentDetails) {
            throw errorHandler(404, "User not found");
          }
      
          return updatedPaymentDetails.upi
    }

    async makeThePayment(){

    }

    async createOrder(amount,currency,receipt){
      const razorpay= new Razorpay({
        key_id: process.env.RAZORPAY_ID_KEY,
        key_secret:process.env.RAZORPAY_SECRET_KEY
      })
      console.log('raz:',process.env.PORT)
      const options={
        amount:amount*100,
        currency,
        receipt
      }
     
      return await razorpay.orders.create(options);
    
    }

    async verifyPayment(razorpayPaymentId,razorpayOrderId,razorpaySignature,paymentId){
      
      const body=razorpayOrderId+"|"+razorpayPaymentId;
      const expectedSignature=crypto.createHmac('sha256',process.env.RAZORPAY_SECRET_KEY).update(body.toString()).digest('hex')
      
      if(expectedSignature===razorpaySignature){
        let updateData={
          razorpayPaymentId,
          razorpayOrderId,
          razorpaySignature,
          clientPayment:'received',
          developerPayment:'initiated'
        }
        const paymentData=await paymentRepository.findByPaymentIdAndUpdate(paymentId,updateData)
        return {success:true,paymentData}
      }else{
        return {success:false}
      }
    
    }

    async updateThePaymentStatus(paymentId){
      
      let updateData={
        developerPayment:'completed'
      }
      return await paymentRepository.findByPaymentIdAndUpdate(paymentId,updateData)
    
    }
}

export default new paymentService()