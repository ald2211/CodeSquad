import Payment from "../models/payment.model.js";

class paymentRepository {
  async createPayment(finalAmount) {
    const payment = new Payment({ finalAmount });
    return await payment.save();
  }

  async findByPaymentIdAndUpdate(id, updateData) {
    return Payment.findByIdAndUpdate(id, { $set: updateData }, { new: true });
  }
}

export default new paymentRepository();
