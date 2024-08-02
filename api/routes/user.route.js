import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {getUserInfo, updateUserProfile,getDeveloperDetails} from "../controllers/user.controller.js";
import { addEducation, deleteEducation, editEducation, getEducation } from "../controllers/education.controller.js";
import { addExperience, deleteExperience, editExperience, getExperience } from "../controllers/experience.controller.js";
import { addProjects, deleteProjects, editProjects, getProjects } from "../controllers/project.controller.js";
import { createWork, getClientAllWorks,updateClientWork,deleteClientWork, handleBookMarks, placeAbid, removeAbid,getBidDetails,acceptBid,getCommittedWorks, getCompletedWorks,getStatusBoxData} from "../controllers/work.controller.js";
import { submitReview } from "../controllers/review.controller.js";
const router = express.Router();

router.patch("/upload/:id",verifyUser(['developer','client','admin']),updateUserProfile);

//education section
router.post("/education/add/:id", verifyUser(['developer','client']), addEducation);
router.patch("/education/edit/:edu_id/:user_id", verifyUser(['developer','client']), editEducation);
router.delete("/education/delete/:id", verifyUser(['developer','client']), deleteEducation);
router.get("/education/get", verifyUser(['developer','client']), getEducation);

//experience section
router.post("/experience/add/:id", verifyUser(['developer','client']), addExperience);
router.patch("/experience/edit/:exp_id/:user_id", verifyUser(['developer','client']), editExperience);
router.delete("/experience/delete/:id", verifyUser(['developer','client']), deleteExperience);
router.get("/experience/get", verifyUser(['developer','client']), getExperience);

//projects section
router.post("/projects/add/:id", verifyUser(['developer','client']), addProjects);
router.patch("/projects/edit/:proj_id/:user_id", verifyUser(['developer','client']), editProjects);
router.delete("/projects/delete/:id", verifyUser(['developer','client']), deleteProjects);
router.get("/projects/get", verifyUser(['developer','client']), getProjects);

//fetch user-info
router.get('/user-info',verifyUser(['admin','client','developer']),getUserInfo)

//user work
router.post('/work/add',verifyUser(['client']),createWork)
router.get('/work/clientWorks',verifyUser(['client','developer']),getClientAllWorks)
router.patch('/work/update/:workId',verifyUser(['client']),updateClientWork)
router.delete('/work/delete/:workId',verifyUser(['client']),deleteClientWork)
router.patch('/work/bookmark/:workId',verifyUser(['developer']),handleBookMarks)
router.get('/work/statusBoxData/:id/:role',verifyUser(['developer','client']),getStatusBoxData)
router.get('/work/committedWorks',verifyUser(['client','developer']),getCommittedWorks)
router.get('/work/completedWorks',verifyUser(['client','developer']),getCompletedWorks)


//user Bids
router.post('/bid/place',verifyUser(['developer']),placeAbid)
router.patch('/bid/remove',verifyUser(['developer']),removeAbid)
router.get('/bidDetails/:workId',verifyUser(['developer','client']),getBidDetails)
router.patch('/bid/accept',verifyUser(['client']),acceptBid)


//developerDetails
router.get('/developer/:devId',verifyUser(['client','developer']),getDeveloperDetails)

//user reviews
router.post('/review',verifyUser(['developer','client']),submitReview)
export default router;
