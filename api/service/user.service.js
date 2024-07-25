import educationRepository from "../repository/education.repository.js";
import experienceRepository from "../repository/experience.repository.js";
import projectRepository from "../repository/project.repository.js";
import userRepository from "../repository/user.repository.js";
import UserRepository from "../repository/user.repository.js";
import { errorHandler } from "../utils/customError.js";

class userService{

    async updateUserProfile(userId, profileData) {
        const updateData = {
          avatar: profileData.avatar,
          rph: profileData.rph,
          jobRole: profileData?.userRole?.trim(),
          resume:  profileData.resume,
          summary: profileData?.summary?.trim(),
          skills: profileData.skills,
        };
    
        const updatedUser = await UserRepository.findByIdAndUpdate(userId, updateData);
    
        if (!updatedUser) {
          throw errorHandler(404, "User not found");
        }
    
        const { password, ...rest } = updatedUser._doc;
        return rest;
      }

      async getUserInfo(id){
       
        const usersInfo= await userRepository.findUserById(id)
        const { password, ...rest } = usersInfo._doc;
        return rest;
      }

      async getDeveloperInfo(id){

        const developerDataWithPassword=await userRepository.findUserById(id)
        const { password, ...developerData } = developerDataWithPassword._doc;
        const developerEducation=await educationRepository.findAllByUserId(id)
        const developerProjects=await projectRepository.findAllByUserId(id)
        const developerExperience=await experienceRepository.findAllByUserId(id)
        return {developerData,developerEducation,developerProjects,developerExperience}
      }
      

}


export default new userService();
