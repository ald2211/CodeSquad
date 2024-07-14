import { generateUniqueWorkId } from "../helpers/workIdGenerator.js";
import workRepository from "../repository/work.repository.js";
import { errorHandler } from "../utils/customError.js";

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

    async getClientWorks(clientId,page,limit,search,filterSearch,role,miniNavFilter){

       return await workRepository.findAllWorksByUserId(clientId,page,limit,search,filterSearch,role,miniNavFilter)
       
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

    async deleteClientWorkByWorkId( workNumber,clientId) {
      const workToRemove = await workRepository.deleteWorkByWorkNumber(workNumber);
  
      if (!workToRemove) {
        throw errorHandler(404, "Project entry not found");
      }
  
      return await workRepository.findAllWorksByUserId(clientId)
    }

    async bookMarkHandler(developerId,workNumber){
      let work = await workRepository.findOneByWorkId(workNumber);
      if (!work) throw errorHandler(404,'work not found')
  
      const bookmarkIndex = work.bookMarks.indexOf(developerId);
      let status;
      let message;
      if (bookmarkIndex === -1) {
        // If the bookmark does not exist, add it
        work.bookMarks.push(developerId);
        await workRepository.saveBookMarkChanges(work)
        status=201
        message='work saved successfully'
        
      } else {
        // If the bookmark already exists, remove it
        work.bookMarks.splice(bookmarkIndex, 1);
        await workRepository.saveBookMarkChanges(work)
        status=200
        message='Bookmark removed Successfully'
      }
      const data =await workRepository.findAllWorksByUserId(developerId)
        return {status,message,data}
    }
}

export default new workSerivice()