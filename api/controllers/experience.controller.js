import experienceService from "../service/experience.service.js";
import { errorHandler } from "../utils/customError.js";

//user experience
export const getExperience = async (req, res, next) => {
  try {
    const userExperience = await experienceService.getAllUserExperience(req.user.id)
    res.status(200).json({
      success: true,
      message: "Details fetched successfully",
      data: userExperience,
    });
  } catch (err) {
    next(err);
  }
};

export const addExperience = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "unAuthorized"));

  try {
    if (
      req.body.jobTitle.trim() === "" ||
      req.body.company.trim() === "" ||
      req.body.location.trim() === ""
    )
      return next(errorHandler(400, "invalid input"));
   const userExperience=await experienceService.addUserExperience(req.user.id,req.body)
    res.status(200).json({
      success: true,
      message: "new experience added",
      data: userExperience,
    });
  } catch (err) {
    console.log("experienceUploadError:", err);
    next(err);
  }
};

export const editExperience = async (req, res, next) => {
  try {
   
    const userExperience=await experienceService.editUserExperience( req.params.user_id,req.params.exp_id,req.body)

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: userExperience,
    });
  } catch (err) {
    console.log("updationError:", err);
    next(err);
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
   const userExperience=await experienceService.deleteUserExperience(req.user.id, req.params.id)
    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: userExperience,
    });
  } catch (err) {
    console.log("error:", err);
    next(err);
  }
};
