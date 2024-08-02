import paymentService from "../service/payment.service.js"



export const updateUpi=async(req,res,next)=>{

    try {
        const data=await paymentService.updateUpiId(req.body)
        console.log('payData:',data)
    res.status(201).json({success:true,message:'UPI Data Saved Successfully',data})
       } catch (err) {
         console.log("errorAt updateUpi:", err);
         next(err);
       }

}


export const updatePaymentStatus=async(req,res,next)=>{

  try {
      await paymentService.updateThePaymentStatus(req.body.paymentId)
      
  res.status(201).json({success:true,message:'payment Forwarded Successfully'})
     } catch (err) {
       console.log("errorAt payment status change:", err);
       next(err);
     }

}



export const createRazorpayOrder=async(req,res,next)=>{
  const {amount,currency,receipt}=req.body
  try{
    const order=await paymentService.createOrder(amount,currency,receipt)
    console.log('order:',order)
    res.json({success:true,order})
  }catch(err){
    console.log('error at order:',err)
  }
}

export const verifyRazorpayPayment=async(req,res,next)=>{
  try{
    const {razorpayPaymentId,razorpayOrderId,razorpaySignature,paymentId}=req.body
    const paymentDetails=await paymentService.verifyPayment(razorpayPaymentId,razorpayOrderId,razorpaySignature,paymentId)
    res.status(200).json(paymentDetails) 
  }catch(err){
    console.log('error:',err)
    next(err)
  }
}


