import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { updateFirstSection } from '../controllers/user.controller.js'


const router=express.Router()

router.patch('/upload/:id',verifyUser,updateFirstSection)

export default router