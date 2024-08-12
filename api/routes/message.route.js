import express from 'express'
import { sendMessage,getMessages,markMessageAsRead, unreadMessages } from '../controllers/message.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router=express.Router()

 router.post('/send/:id',verifyUser(['client','developer','admin']),sendMessage)
 router.patch('/set/markMessageAsRead',verifyUser(['client','developer','admin']),markMessageAsRead)
 router.get('/:id',verifyUser(['client','developer','admin']),getMessages)
 router.get('/get/unreadMessages',verifyUser(['client','developer','admin']),unreadMessages)















export default router;