import { generateUniqueWorkId } from "../helpers/workIdGenerator.js";
import workRepository from "../repository/work.repository.js";
import { errorHandler } from "../utils/customError.js";

class workSerivice{

    async addWork(role,clientId,workData){

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
        return await workRepository.findAllWorksByUserId(role,clientId);
    }

    async getClientWorks(role,clientId,page,limit,search,filterSearch,miniNavFilter){

       return await workRepository.findAllWorksByUserId(role,clientId,page,limit,search,filterSearch,miniNavFilter)
       
    }

    
    async getAllCommittedWorks(role,clientId,page,limit,search){
      return await workRepository.findAllCommittedWorks(role,clientId,page,limit,search)
   }


    
    
    async updateWork(role,workId,workData,clientId){
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
      return await workRepository.findAllWorksByUserId(role,clientId)
    }

    async deleteClientWorkByWorkId( role,workNumber,clientId) {
      const workToRemove = await workRepository.deleteWorkByWorkNumber(workNumber);
  
      if (!workToRemove) {
        throw errorHandler(404, "Project entry not found");
      }
  
      return await workRepository.findAllWorksByUserId(role,clientId)
    }

    async bookMarkHandler(role,developerId,workNumber){
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
      const data =await workRepository.findAllWorksByUserId(role,developerId)
        return {status,message,data}
    }


    async placeBid(role,Id,bidDetails){
      let work = await workRepository.findOneByWorkId(bidDetails.workId);
      if (!work) throw errorHandler(404,'work not found')
      let completedWorks=await workRepository.findCompletedWorksById(Id)
      if(work.budget<bidDetails.bidAmount)throw errorHandler(400,'bid amount must be less than budget')
       const updatedData= await workRepository.createBid(Id,bidDetails,completedWorks);
       
       if(!updatedData)throw errorHandler(400,'bid placing failed')

      return await workRepository.findAllWorksByUserId(role,Id)
    }

    async removeBid(role,Id,workId){
      
      let work = await workRepository.findOneByWorkId(workId);
      if (!work) throw errorHandler(404,'work not found')

        const updatedData= await workRepository.removeBid(workId,Id);
       
        if(!updatedData)throw errorHandler(400,'bid removing failed')
 
       return await workRepository.findAllWorksByUserId(role,Id)
    }

    async getBidDetails(workId,page,pageSize){

      let work=await workRepository.findOneByWorkId(workId)
      const totalBids = work.bids.length;
      const skip = (page - 1) * pageSize;
      const paginatedBids = work.bids.slice(skip, skip + parseInt(pageSize));
      const data={ bids: paginatedBids, totalBids }
      return data

    }

    async acceptDeveloperBid(role,Id,work){

      let updateWorkData={
        developerId:work.developer,
        workStatus:'committed'
      }
      const updatedData=await workRepository.findByWorkIdAndUpdate(work.workNumber,updateWorkData)
      if(!updatedData)throw errorHandler(400,'bid removing failed')
      return await workRepository.findAllWorksByUserId(role,Id)

    }

}

    

export default new workSerivice()