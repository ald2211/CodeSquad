import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { findAllUserWorks, getAllUsers, updateUserState,updateProjectState } from '../controllers/admin.controller.js'

const router=express.Router()

//usermanagement

router.get('/allUsers',verifyUser(['admin']),getAllUsers)
router.patch('/updateStatus/:id',verifyUser(['admin']),updateUserState)
router.get('/allWorks',verifyUser(['admin']),findAllUserWorks)
router.patch('/updateProjectStatus/:id',verifyUser(['admin']),updateProjectState)









export default router