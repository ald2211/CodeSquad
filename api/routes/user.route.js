import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {getUserInfo, updateUserProfile} from "../controllers/user.controller.js";
import { addEducation, deleteEducation, editEducation, getEducation } from "../controllers/education.controller.js";
import { addExperience, deleteExperience, editExperience, getExperience } from "../controllers/experience.controller.js";
import { addProjects, deleteProjects, editProjects, getProjects } from "../controllers/project.controller.js";
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

export default router;
