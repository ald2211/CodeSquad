import { generateUniqueWorkId } from "../helpers/workIdGenerator.js";
import workRepository from "../repository/work.repository.js";

class workSerivice{

    async addWork(clientId,workData){

        //create a unique work id
        const workNumber=await generateUniqueWorkId()
        const newWork = {
          workNumber,
          clientId,
          workName:workData.projectName,
          workType:workData.type,
          budget:workData.budget,
          bidEndDate:workData.endDate,
          description:workData.description,
          attachMents:workData?.attachment

        };
    
        await workRepository.create(newWork);
        return await workRepository.findAllWorksByUserId(clientId);
    }

    async getClientWorks(clientId){

       return await workRepository.findAllWorksByUserId(clientId)
    }
    
    async updateWork(workId,workData,clientId){
        console.log('UpdateworkData:',workData)
      const updateWorkData = {
          workName:workData.projectName,
          workType:workData.type,
          budget:workData.budget,
          bidEndDate:workData.endDate,
          description:workData.description,
          attachMents:workData.attachment
      };
      
      const updatedUser = await workRepository.findByWorkIdAndUpdate(workId, updateWorkData);
     
      if (!updatedUser) {
        throw errorHandler(404, "work not found");
      }
      return await workRepository.findAllWorksByUserId(clientId)
    }
}

export default new workSerivice()