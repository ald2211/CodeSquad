import project from "../models/project.model.js";
import projectService from "../service/project.service.js";
import { errorHandler } from "../utils/customError.js";

//user projects
export const getProjects = async (req, res, next) => {
  try {
    const userProjects=await projectService.getAllUserProjects(req.user.id)
    res.status(200).json({
      success: true,
      message: "Details fetched successfully",
      data: userProjects,
    });
  } catch (err) {
    next(err);
  }
};

export const addProjects = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "unAuthorized"));

  try {
    
    const userProjects=await projectService.addUserProject(req.user.id, req.body)
    res.status(200).json({
      success: true,
      message: " Project added successfully",
      data: userProjects,
    });
  } catch (err) {
    console.log("project:", err);
    next(err);
  }
};

export const editProjects = async (req, res, next) => {
  try {
    const userProjects=await projectService.editUserProject(  req.params.user_id,req.params.proj_id,req.body)
    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: userProjects,
    });
  } catch (err) {
    console.log("updationError:", err);
    next(err);
  }
};

export const deleteProjects = async (req, res, next) => {
  try {
    const userProjects=await projectService.deleteUserProject(req.user.id, req.params.id)
    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: userProjects,
    });
  } catch (err) {
    console.log("error:", err);
    next(err);
  }
};
