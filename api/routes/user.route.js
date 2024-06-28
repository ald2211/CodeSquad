import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { updateUserProfile } from '../controllers/user.controller.js'
import { upload } from '../utils/uploadConfig.js'
const router=express.Router()



router.patch('/upload/:id',verifyUser,upload.single('resume'),updateUserProfile)


export default router