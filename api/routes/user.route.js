import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {updateUserProfile} from "../controllers/user.controller.js";
import { upload } from "../utils/uploadConfig.js";
import { addEducation, deleteEducation, editEducation, getEducation } from "../controllers/education.controller.js";
import { addExperience, deleteExperience, editExperience, getExperience } from "../controllers/experience.controller.js";
import { addProjects, deleteProjects, editProjects, getProjects } from "../controllers/project.controller.js";
const router = express.Router();

router.patch("/upload/:id",verifyUser,updateUserProfile);

//education section
router.post("/education/add/:id", verifyUser, addEducation);
router.patch("/education/edit/:edu_id/:user_id", verifyUser, editEducation);
router.delete("/education/delete/:id", verifyUser, deleteEducation);
router.get("/education/get", verifyUser, getEducation);

//experience section
router.post("/experience/add/:id", verifyUser, addExperience);
router.patch("/experience/edit/:exp_id/:user_id", verifyUser, editExperience);
router.delete("/experience/delete/:id", verifyUser, deleteExperience);
router.get("/experience/get", verifyUser, getExperience);

//projects section
router.post("/projects/add/:id", verifyUser, addProjects);
router.patch("/projects/edit/:proj_id/:user_id", verifyUser, editProjects);
router.delete("/projects/delete/:id", verifyUser, deleteProjects);
router.get("/projects/get", verifyUser, getProjects);

export default router;
