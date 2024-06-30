import education from "../models/education.model.js";
import experience from "../models/experience.model.js";
import project from "../models/project.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/customError.js";

export const updateUserProfile = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler("401", "unAuthorized"));

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          avatar: req.body.avatar,
          rph: req.body.rph,
          jobRole: req.body.userRole,
          resume: req.file?.filename,
          summary: req.body.summary,
          skills: req.body.skills,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res
      .status(201)
      .json({ success: true, message: "updated successfully", user: rest });
  } catch (err) {
    console.log("errorAt server:", err);
    next(err);
  }
};

//user education

export const getEducation = async (req, res, next) => {
  try {
    const userEducation = await education.aggregate([
      { $match: { userId: req.user.id } },
    ]);
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
    const existingEducation = await education.aggregate([
      {
        $match: {
          userId: req.user.id,
          courseName: req.body.courseName.trim(),
          collegeName: req.body.collegeName.trim(),
        },
      },
    ]);

    if (existingEducation && existingEducation.length > 0)
      return next(errorHandler(400, "This education entry already exists"));
    const newEducation = new education({
      userId: req.user.id,
      courseName: req.body.courseName.trim(),
      collegeName: req.body.collegeName.trim(),
      country: req.body.country.trim(),
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
    });

    await newEducation.save();
    const userEducation = await education.aggregate([
      { $match: { userId: req.user.id } },
    ]);
    res
      .status(200)
      .json({
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
    const existEducation = await education.findOne({
      _id: req.params.edu_id,
      userId: req.params.user_id,
    });

    if (!existEducation)
      return next(errorHandler(404, "Education entry not found"));
    if (
      req.body.courseName.trim() === "" ||
      req.body.country.trim() === "" ||
      req.body.collegeName.trim() === ""
    )
      return next(errorHandler(400, "invalid input"));
    const updatedEducation = await education.findByIdAndUpdate(
      req.params.edu_id,
      {
        $set: {
          courseName: req.body.courseName.trim(),
          collegeName: req.body.collegeName.trim(),
          country: req.body.country.trim(),
          startDate: req.body.startDate,
          endDate: req.body.endDate,
        },
      },
      { new: true }
    );
    await updatedEducation.save();

    const userEducation = await education.aggregate([
      { $match: { userId: req.user.id } },
    ]);

    res
      .status(200)
      .json({
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
    const educationToRemove = await education.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!educationToRemove)
      return next(errorHandler(404, "Education entry not found"));

    const userEducation = await education.aggregate([
      { $match: { userId: req.user.id } },
    ]);
    res
      .status(200)
      .json({
        success: true,
        message: "education updated",
        data: userEducation,
      });
  } catch (err) {
    console.log("error:", err);
    next(err);
  }
};

//user experience
export const getExperience = async (req, res, next) => {
  try {
    const userExperience = await experience.aggregate([
      { $match: { userId: req.user.id } },
    ]);
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
    const existingExperience = await experience.aggregate([
      {
        $match: {
          userId: req.user.id,
          jobTitle: req.body.jobTitle.trim(),
          company: req.body.company.trim(),
        },
      },
    ]);

    console.log("existingEducation:", existingExperience);

    if (existingExperience && existingExperience.length > 0)
      return next(errorHandler(400, "experience entry already exists"));
    const newExperience = new experience({
      userId: req.user.id,
      jobTitle: req.body.jobTitle.trim(),
      company: req.body.company.trim(),
      location: req.body.location.trim(),
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
    });

    await newExperience.save();
    const userExperience = await experience.aggregate([
      { $match: { userId: req.user.id } },
    ]);
    res
      .status(200)
      .json({
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
    const existingExperience = await experience.findOne({
      _id: req.params.exp_id,
      userId: req.params.user_id,
    });

    if (!existingExperience)
      return next(errorHandler(404, "Experience entry not found"));
    if (
      req.body.jobTitle.trim() === "" ||
      req.body.company.trim() === "" ||
      req.body.location.trim() === ""
    )
      return next(errorHandler(400, "invalid input"));

    const updateExperience = await experience.findByIdAndUpdate(
      req.params.exp_id,
      {
        $set: {
          jobTitle: req.body.jobTitle.trim(),
          company: req.body.company.trim(),
          location: req.body.location.trim(),
          startDate: req.body.startDate,
          endDate: req.body.endDate,
        },
      },
      { new: true }
    );
    await updateExperience.save();

    const userExperience = await experience.aggregate([
      { $match: { userId: req.user.id } },
    ]);

    res
      .status(200)
      .json({
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
    const experienceToRemove = await experience.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!experienceToRemove)
      return next(errorHandler(404, "Experience entry not found"));

    const userExperience = await experience.aggregate([
      { $match: { userId: req.user.id } },
    ]);
    res
      .status(200)
      .json({
        success: true,
        message: "Experience updated successfully",
        data: userExperience,
      });
  } catch (err) {
    console.log("error:", err);
    next(err);
  }
};

//user projects
export const getProjects = async (req, res, next) => {
  try {
    const userProjects = await project.aggregate([
      { $match: { userId: req.user.id } },
    ]);
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
    if (
      req.body.projectName.trim() === "" ||
      req.body.projectSummary.trim() === ""
    )
      return next(errorHandler(400, "invalid input"));
    const existingProject = await project.aggregate([
      {
        $match: {
          userId: req.user.id,
          projectName: req.body.projectName.trim(),
        },
      },
    ]);

    if (existingProject && existingProject.length > 0)
      return next(errorHandler(400, "project entry already exists"));
    
    const newProject = new project({
      userId: req.user.id,
      projectName: req.body.projectName.trim(),
      projectSummary: req.body.projectSummary.trim(),
    });
    await newProject.save();
    const userProjects = await project.aggregate([
      { $match: { userId: req.user.id } },
    ]);
    res
      .status(200)
      .json({
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
    const existingProject = await project.findOne({
      _id: req.params.proj_id,
      userId: req.params.user_id,
    });

    if (!existingProject)
      return next(errorHandler(404, "Project entry not found"));
    if (req.user.id !== req.params.user_id)
      return next(errorHandler(401, "unAuthorized"));

    if (
        req.body.projectName.trim() === "" ||
        req.body.projectSummary.trim() === ""
      )
        return next(errorHandler(400, "invalid input"));
        
    const updateProject = await project.findByIdAndUpdate(
      req.params.proj_id,
      {
        $set: {
          projectName: req.body.projectName.trim(),
          projectSummary: req.body.projectSummary.trim(),
        },
      },
      { new: true }
    );
    await updateProject.save();

    const userProjects = await project.aggregate([
      { $match: { userId: req.user.id } },
    ]);

    res
      .status(200)
      .json({
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
    const projectToRemove = await project.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!projectToRemove)
      return next(errorHandler(404, "Project entry not found"));

    const userProjects = await project.aggregate([
      { $match: { userId: req.user.id } },
    ]);
    res
      .status(200)
      .json({
        success: true,
        message: "Project deleted successfully",
        data: userProjects,
      });
  } catch (err) {
    console.log("error:", err);
    next(err);
  }
};
