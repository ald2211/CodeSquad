import userRepository from "../repository/user.repository.js"
import { errorHandler } from "../utils/customError.js"

class adminService{

    async findAllUsers(){

        const result =await userRepository.findAllUsers()

        return result

    }

    async updateUserStatus(id,{userState}){

    
        
        const updatedUser=await userRepository.findByIdAndUpdate(id,{userState:!userState})
        if (!updatedUser) {
            throw errorHandler(404, "user not found");
          }
          console.log('updated:',updatedUser)
          return updatedUser._doc.userState;
        
    }
}


export default new adminService()