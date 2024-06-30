import project from "../models/project.model.js";

class projectRepository{

        async findAllByUserId(userId) {
          return await project.aggregate([{ $match: { userId } }]);
        }
      
        async findByUserIdAndProjectName(userId, projectName) {
          return await project.aggregate([
            {
              $match: {
                userId,
                projectName: projectName.trim(),
              },
            },
          ]);
        }
      
        async create(newProject) {
          const Project = new project(newProject);
          return await Project.save();
        }
      
        async findByIdAndUserId(projId, userId) {
          return await project.findOne({ _id: projId, userId });
        }
      
        async updateById(projId, updatedData) {
          return await project.findByIdAndUpdate(
            projId,
            { $set: updatedData },
            { new: true }
          );
        }
      
        async deleteByIdAndUserId(projId, userId) {
          return await project.findOneAndDelete({ _id: projId, userId });
        }
      
}

export default new projectRepository()