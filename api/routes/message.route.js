import express from 'express'
import { sendMessage,getMessages } from '../controllers/message.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router=express.Router()

 router.post('/send/:id',verifyUser(['client','developer','admin']),sendMessage)
 router.get('/:id',verifyUser(['client','developer','admin']),getMessages)













export default router;