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