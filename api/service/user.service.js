import educationRepository from "../repository/education.repository.js";
import experienceRepository from "../repository/experience.repository.js";
import projectRepository from "../repository/project.repository.js";
import reviewRepository from "../repository/review.repository.js";
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
        const userRating=await reviewRepository.findAverageRatingByUserId(id)

        const { password, ...rest } = usersInfo._doc;
        rest.averageRating=userRating;
        console.log('avgRating:',rest.averageRating)
        return rest;
      }

      async getDeveloperInfo(id){

        const developerDataWithPassword=await userRepository.findUserById(id)
        const { password, ...developerData } = developerDataWithPassword._doc;
        const developerEducation=await educationRepository.findAllByUserId(id)
        const developerProjects=await projectRepository.findAllByUserId(id)
        const developerExperience=await experienceRepository.findAllByUserId(id)
        const developerReviews=await reviewRepository.findAllReviewsByUserId(id)
        return {developerData,developerEducation,developerProjects,developerExperience,developerReviews}
      }
      
      async getAdmin(){

        return await userRepository.getAdminId()
      }

      async getUserProfileStatus(id){

        const usersInfo= await userRepository.findUserById(id)
        const eduCount=await educationRepository.findAllByUserId(id)
        const projCount=await projectRepository.findAllByUserId(id)
        const expCount=await experienceRepository.findAllByUserId(id)
        return (eduCount.length>0)+(projCount.length>0)+(expCount.length>0)+(usersInfo.summary?1:0)
      }

      

}


export default new userService();
