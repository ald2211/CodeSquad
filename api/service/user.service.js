import UserRepository from "../repository/user.repository.js";
import { errorHandler } from "../utils/customError.js";

class userService{

    async updateUserProfile(userId, profileData, file) {
        
        const updateData = {
          avatar: profileData.avatar,
          rph: profileData.rph,
          jobRole: profileData?.userRole?.trim(),
          resume: file ? file.filename : profileData.resume,
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

}


export default new userService();
