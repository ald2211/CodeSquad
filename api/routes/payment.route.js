import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { updateUpi } from '../controllers/payment.controller.js';
const router=express.Router()


router.patch('/updateUpi',verifyUser(['developer']),updateUpi)

export default router