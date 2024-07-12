import userRepository from "../repository/user.repository.js";
import UserRepository from "../repository/user.repository.js";
import { errorHandler } from "../utils/customError.js";

class userService{

    async updateUserProfile(userId, profileData) {
        console.log('profile DAta:',profileData)
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
        return await userRepository.findUserById(id)
      }

}


export default new userService();
