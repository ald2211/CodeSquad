import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { addEducation, updateUserProfile, editEducation,deleteEducation, getEducation} from '../controllers/user.controller.js'
import { upload } from '../utils/uploadConfig.js'
const router=express.Router()



router.patch('/upload/:id',verifyUser,upload.single('resume'),updateUserProfile)
router.post('/education/add/:id',verifyUser,addEducation)
router.patch('/education/edit/:edu_id/:user_id',verifyUser,editEducation)
router.delete('/education/delete/:id',verifyUser,deleteEducation)
router.get('/education/get',verifyUser,getEducation)


export default router