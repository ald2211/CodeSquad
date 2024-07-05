import educationRepository from "../repository/education.repository.js";
import { errorHandler } from "../utils/customError.js";

class educationService{

    async getAllUserEducation(userId){
      
        return await educationRepository.findAllByUserId(userId)
    }

    async addUserEducation(userId, educationData) {
        const { courseName, collegeName, country, startDate, endDate } = educationData;
    
        const existingEducation = await educationRepository.findByUserIdAndCourse(
          userId,
          courseName,
          collegeName
        );
    
        if (existingEducation && existingEducation.length > 0) {
          throw errorHandler(400, "This education entry already exists");
        }
    
        const newEducation = {
          userId,
          courseName: courseName.trim(),
          collegeName: collegeName.trim(),
          country: country.trim(),
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        };
    
        await educationRepository.create(newEducation);
        return await educationRepository.findAllByUserId(userId);
      }
    
      async editUserEducation(userId, eduId, educationData) {
        const existEducation = await educationRepository.findByIdAndUserId(eduId, userId);
        
        if (!existEducation) {
          throw errorHandler(404, "Education entry not found");
        }
    
        const { courseName, collegeName, country, startDate, endDate } = educationData;
        
        if (courseName.trim() === "" || country.trim() === "" || collegeName.trim() === "") {
          throw errorHandler(400, "Invalid input");
        }
    
        const updatedEducation = {
          courseName: courseName.trim(),
          collegeName: collegeName.trim(),
          country: country.trim(),
          startDate,
          endDate,
        };
    
        await educationRepository.updateById(eduId, updatedEducation);
        return await educationRepository.findAllByUserId(userId);
      }
    
      async deleteUserEducation(userId, eduId) {
        const educationToRemove = await educationRepository.deleteByIdAndUserId(eduId, userId);
        
        if (!educationToRemove) {
          throw errorHandler(404, "Education entry not found");
        }
    
        return await educationRepository.findAllByUserId(userId);
      }
}

export default new educationService();