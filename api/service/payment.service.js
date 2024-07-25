import paymentRepository from "../repository/payment.repository.js";

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
}

export default new paymentService()