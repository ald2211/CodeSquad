import paymentService from "../service/payment.service.js";

export const updateUpi = async (req, res, next) => {
  try {
    const data = await paymentService.updateUpiId(req.body);

    res
      .status(201)
      .json({ success: true, message: "UPI Data Saved Successfully", data });
  } catch (err) {
    next(err);
  }
};

export const updatePaymentStatus = async (req, res, next) => {
  try {
    await paymentService.updateThePaymentStatus(req.body.paymentId);

    res
      .status(201)
      .json({ success: true, message: "payment Forwarded Successfully" });
  } catch (err) {
    next(err);
  }
};

export const createRazorpayOrder = async (req, res, next) => {
  const { amount, currency, receipt } = req.body;
  try {
    const order = await paymentService.createOrder(amount, currency, receipt);

    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

export const verifyRazorpayPayment = async (req, res, next) => {
  try {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature, paymentId } =
      req.body;
    const paymentDetails = await paymentService.verifyPayment(
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      paymentId
    );
    res.status(200).json(paymentDetails);
  } catch (err) {
    next(err);
  }
};
