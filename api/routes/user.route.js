import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { addEducation, updateUserProfile, editEducation,deleteEducation, getEducation, addExperience, editExperience, deleteExperience, getExperience} from '../controllers/user.controller.js'
import { upload } from '../utils/uploadConfig.js'
const router=express.Router()



router.patch('/upload/:id',verifyUser,upload.single('resume'),updateUserProfile)

//education section
router.post('/education/add/:id',verifyUser,addEducation)
router.patch('/education/edit/:edu_id/:user_id',verifyUser,editEducation)
router.delete('/education/delete/:id',verifyUser,deleteEducation)
router.get('/education/get',verifyUser,getEducation)

//experience section
router.post('/experience/add/:id',verifyUser,addExperience)
router.patch('/experience/edit/:exp_id/:user_id',verifyUser,editExperience)
router.delete('/experience/delete/:id',verifyUser,deleteExperience)
router.get('/experience/get',verifyUser,getExperience)

export default router