import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { createRazorpayOrder, updatePaymentStatus, updateUpi,verifyRazorpayPayment } from '../controllers/payment.controller.js';
const router=express.Router()


router.patch('/updateUpi',verifyUser(['developer']),updateUpi)
router.patch('/updatePaymentStatus',verifyUser(['admin']),updatePaymentStatus)
router.post('/order',verifyUser(['client']),createRazorpayOrder)
router.post('/verifyPayment',verifyUser(['client']),verifyRazorpayPayment)

export default router