import projectRepository from "../repository/project.repository.js";
import { errorHandler } from "../utils/customError.js";

class projectService {
  async getAllUserProjects(userId) {
    return await projectRepository.findAllByUserId(userId);
  }

  async addUserProject(userId, projectData) {
    const { projectName, projectSummary } = projectData;

    if (projectName.trim() === "" || projectSummary.trim() === "") {
      throw errorHandler(400, "Invalid input");
    }

    const existingProject = await projectRepository.findByUserIdAndProjectName(
      userId,
      projectName
    );

    if (existingProject && existingProject.length > 0) {
      throw errorHandler(400, "This project entry already exists");
    }

    const newProject = {
      userId,
      projectName: projectName.trim(),
      projectSummary: projectSummary.trim(),
    };

    await projectRepository.create(newProject);
    return await projectRepository.findAllByUserId(userId);
  }

  async editUserProject(userId, projId, projectData) {
    const existingProject = await projectRepository.findByIdAndUserId(
      projId,
      userId
    );

    if (!existingProject) {
      throw errorHandler(404, "Project entry not found");
    }

    const { projectName, projectSummary } = projectData;

    if (projectName.trim() === "" || projectSummary.trim() === "") {
      throw errorHandler(400, "Invalid input");
    }

    const updatedProject = {
      projectName: projectName.trim(),
      projectSummary: projectSummary.trim(),
    };

    await projectRepository.updateById(projId, updatedProject);
    return await projectRepository.findAllByUserId(userId);
  }

  async deleteUserProject(userId, projId) {
    const projectToRemove = await projectRepository.deleteByIdAndUserId(
      projId,
      userId
    );

    if (!projectToRemove) {
      throw errorHandler(404, "Project entry not found");
    }

    return await projectRepository.findAllByUserId(userId);
  }
}

export default new projectService();
