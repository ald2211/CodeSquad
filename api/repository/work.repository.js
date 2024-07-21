import Work from "../models/work.model.js";
class workRepository{

    async create(newWork) {
        const work = new Work(newWork);
        return await work.save();
      }
    
    async findWorkById(id){
      return await Work.findOne({workNumber:id})
    }
    async findAllWorksByUserId(role,Id,page,limit,search,filterSearch,miniNavFilter) {
  let query = search
    ? { $or: [{ workName: new RegExp(search, 'i') }, { workType: new RegExp(search, 'i') }]}
    : {};

  if(role==='client')query.clientId=Id;
   if(filterSearch){
    let filterData=filterSearch.split('--')
    query={
      ...query,
      workType:filterData[0],
      budget: {
        $gte: +filterData[1],
        $lte: +filterData[2]
      }
    }
  }
  
  if(miniNavFilter==='recent'){
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      query={
        ...query,
        createdAt:{ $gte: twoWeeksAgo }
      }
    }

    if(miniNavFilter==='saved'){
     
      query={
        ...query,
        bookMarks:{ $in: [Id] }
      }
    }
    
    const count = await Work.countDocuments(query);
    const data = await Work.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

      return { count, data };
    }

    async findAllCommittedWorks(role,Id) {
      let query ={ workStatus:'committed'};
    
      if(role==='client')query.clientId=Id;
      if(role==='developer')query.developerId=Id;
      const data = await Work.find(query)
          return data;
        }
    
    async findByWorkIdAndUpdate(workNumber, updateData) {
       return await Work.updateOne({workNumber}, { $set:updateData });
    }

    async deleteWorkByWorkNumber(workNumber){
       return await Work.deleteOne({workNumber})
    }

    async findOneByWorkId(workNumber){
      return await Work.findOne({workNumber})
    }
    
    async saveBookMarkChanges(work){

      await work.save();
    }

    async createBid(id,bidDetails,completedWorks){
       const data={
          developer:id,
          developerName:bidDetails.developerName,
          developerPhoto:bidDetails.developerPhoto,
          developerRole:bidDetails.developerRole,
          completedProjects:completedWorks,
          bidAmount:bidDetails.bidAmount,
          deliveryTime:bidDetails.deliveryTime
       }
       return await Work.updateOne({workNumber:bidDetails.workId},{ $push: { bids: data } }) 
    }

    async removeBid(workId,Id){
      
      return await Work.updateOne({ workNumber: workId },{ $pull: { bids: { developer: Id } } });
   }

   async findCompletedWorksById(id){
     
    return await Work.countDocuments({ 
      $and: [
        { workStatus: 'closed' }, 
        { developer: id }
      ]
    });
   }
}

export default new workRepository()