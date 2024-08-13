import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { getNotification,deleteSingleNotification,deleteAllNotification } from '../controllers/notification.controller.js'

const router =express.Router()

router.get('/',verifyUser(['client','developer','admin']),getNotification)
router.delete('/delete/:id',verifyUser(['client','developer','admin']),deleteSingleNotification)
router.delete('/deleteAll',verifyUser(['client','developer','admin']),deleteAllNotification)














export default router