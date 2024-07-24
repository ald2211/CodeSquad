import userRepository from "../repository/user.repository.js"
import workRepository from "../repository/work.repository.js";
import { errorHandler } from "../utils/customError.js"

class adminService{

    async findAllUsers(page,limit,search){

        return await userRepository.findAllUsers(page,limit,search)
    }

    async updateUserStatus(id,{userState}){

    
        
        const updatedUser=await userRepository.findByIdAndUpdate(id,{userState:!userState})
        if (!updatedUser) {
            throw errorHandler(404, "user not found");
          }
          console.log('updated:',updatedUser)
          return updatedUser._doc.userState;
        
    }

    async findAllWorks(role,page,limit,search){

        return await workRepository.findAllCommittedWorks(role,'',page,limit,search)
    }

    async updateWorkStatus(id){
        
        const updatedData=await workRepository.findByWorkIdAndUpdate(id,{workStatus:'completed'})
        if (!updatedData) {
            throw errorHandler(404, "work not found");
          }
          console.log('updated:',updatedData)
        
    }
    

}


export default new adminService()