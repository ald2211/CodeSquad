import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { getAllUsers, updateUserState } from '../controllers/admin.controller.js'

const router=express.Router()

//usermanagement

router.get('/allUsers',verifyUser(['admin']),getAllUsers)
router.patch('/updateStatus/:id',verifyUser(['admin']),updateUserState)









export default router