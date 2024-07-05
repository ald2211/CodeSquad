import educationService from "../service/education.service.js";
import { errorHandler } from "../utils/customError.js";

//user education

export const getEducation = async (req, res, next) => {
  try {
    
    const userEducation = await educationService.getAllUserEducation(req.user.id)
    res.status(200).json({
      success: true,
      message: "Details fetched successfully",
      data: userEducation,
    });
  } catch (err) {
    next(err);
  }
};

export const addEducation = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "unAuthorized"));

  try {
    if (
      req.body.courseName.trim() === "" ||
      req.body.country.trim() === "" ||
      req.body.collegeName.trim() === ""
    )
      return next(errorHandler(400, "invalid input"));
    const userEducation = await educationService.addUserEducation(req.user.id,req.body)
    res.status(200).json({
      success: true,
      message: "new education added",
      data: userEducation,
    });
  } catch (err) {
    console.log("educationUploadError:", err);
    next(err);
  }
};

export const editEducation = async (req, res, next) => {
  try {
    
    const userEducation=await educationService.editUserEducation(req.params.user_id,req.params.edu_id,req.body)
    res.status(200).json({
      success: true,
      message: "Education updated successfully",
      data: userEducation,
    });
  } catch (err) {
    console.log("updationError:", err);
    next(err);
  }
};

export const deleteEducation = async (req, res, next) => {
  try {
    
    const userEducation=await educationService.deleteUserEducation(req.user.id,req.params.id)
    res.status(200).json({
      success: true,
      message: "education updated",
      data: userEducation,
    });
  } catch (err) {
    console.log("error:", err);
    next(err);
  }
};
