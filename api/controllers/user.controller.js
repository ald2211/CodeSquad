import userService from "../service/user.service.js";
import { errorHandler } from "../utils/customError.js";

export const updateUserProfile = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler("401", "unAuthorized"));

  try {
    const updatedUserProfile = await userService.updateUserProfile(
      req.params.id,
      req.body
    );
    res
      .status(201)
      .json({
        success: true,
        message: "updated successfully",
        data: updatedUserProfile,
      });
  } catch (err) {
    next(err);
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const userInfo = await userService.getUserInfo(req.user.id);
    res
      .status(201)
      .json({
        success: true,
        message: "user fetched successfully",
        data: userInfo,
      });
  } catch (err) {
    next(err);
  }
};

export const getDeveloperDetails = async (req, res, next) => {
  try {
    const data = await userService.getDeveloperInfo(req.params.devId);
    res
      .status(200)
      .json({ success: true, message: "user fetched successfully", data });
  } catch (err) {
    next(err);
  }
};

export const getProfileData = async (req, res, next) => {
  try {
    const count = await userService.getUserProfileStatus(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "user fetched successfully", count });
  } catch (err) {
    next(err);
  }
};
