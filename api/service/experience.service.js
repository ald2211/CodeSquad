import experienceRepository from "../repository/experience.repository.js";
import { errorHandler } from "../utils/customError.js";

class experienceService {
  async getAllUserExperience(userId) {
    return await experienceRepository.findAllByUserId(userId);
  }

  async addUserExperience(userId, experienceData) {
    const { jobTitle, company, location, startDate, endDate } = experienceData;

    if (
      jobTitle.trim() === "" ||
      company.trim() === "" ||
      location.trim() === ""
    ) {
      throw errorHandler(400, "Invalid input");
    }

    const existingExperience = await experienceRepository.findByUserIdAndJob(
      userId,
      jobTitle,
      company
    );

    if (existingExperience && existingExperience.length > 0) {
      throw errorHandler(400, "This experience entry already exists");
    }

    const newExperience = {
      userId,
      jobTitle: jobTitle.trim(),
      company: company.trim(),
      location: location.trim(),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };

    await experienceRepository.create(newExperience);
    return await experienceRepository.findAllByUserId(userId);
  }

  async editUserExperience(userId, expId, experienceData) {
    const existingExperience = await experienceRepository.findByIdAndUserId(
      expId,
      userId
    );

    if (!existingExperience) {
      throw errorHandler(404, "Experience entry not found");
    }

    const { jobTitle, company, location, startDate, endDate } = experienceData;

    if (
      jobTitle.trim() === "" ||
      company.trim() === "" ||
      location.trim() === ""
    ) {
      throw errorHandler(400, "Invalid input");
    }

    const updatedExperience = {
      jobTitle: jobTitle.trim(),
      company: company.trim(),
      location: location.trim(),
      startDate,
      endDate,
    };

    await experienceRepository.updateById(expId, updatedExperience);
    return await experienceRepository.findAllByUserId(userId);
  }

  async deleteUserExperience(userId, expId) {
    const experienceToRemove = await experienceRepository.deleteByIdAndUserId(
      expId,
      userId
    );

    if (!experienceToRemove) {
      throw errorHandler(404, "Experience entry not found");
    }

    return await experienceRepository.findAllByUserId(userId);
  }
}

export default new experienceService();
