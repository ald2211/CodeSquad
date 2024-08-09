import Work from "../models/work.model.js";
import userRepository from "./user.repository.js";
class workRepository{

    async create(newWork) {
        const work = new Work(newWork);
        return await work.save();
      }
    
    async findWorkById(id){
      return await Work.findOne({workNumber:id})
    }
    async findAllWorksByUserId(role,Id,page,limit,search,filterSearch,miniNavFilter,sortBy) {
  let query = search
    ? { $or: [{ workName: new RegExp(search, 'i') }, { workType: new RegExp(search, 'i') }]}
    : {};

  if(role==='client')query.clientId=Id;
  if(role==='developer'){
    let developer= await userRepository.findUserById(Id)
    if(developer&&developer.skills.length>0){
      query.requiredSkills = { $in: developer.skills };
    }
  }
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
  let Sort = {budget:1};
  const sortOptions = sortBy?.split('--');
    if (sortOptions?.length>0) {
        sortOptions.forEach(option => {
            if (option === 'price') {
                Sort.budget = -1; 
            } else if (option === 'recent') {
                Sort.createdAt = -1;
            }
        });
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
      .sort(Sort)
      .skip((page - 1) * limit)
      .limit(limit)

      return { count, data };
    }

    async findAllCommittedWorks(role,Id,page=1,limit=10,search='') {

      const query=search?
      { $or: [{ workName: new RegExp(search, 'i') }, { workType: new RegExp(search, 'i') },{ workStatus: new RegExp(search, 'i') }] }
      :
      {}
    
      if(role!=='admin') query.workStatus='committed'
      if(role==='client')query.clientId=Id;
      if(role==='developer')query.developerId=Id;
      const count=await Work.countDocuments(query)
       const result=await Work.find(query).populate('clientId', ' _id name avatar email').populate('paymentId')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({updatedAt:-1})
const data = result.map(work => ({
  ...work.toObject(),
  clientId: {
    _id:work.clientId._id,
    name: work.clientId.name,
    avatar: work.clientId.avatar,
    email:work.clientId.email
  },
  paymentId:work.paymentId
}));
return {count,data}
        }
    
        async findAllCompletedWorks(role,Id,page=1,limit=10,search='') {

          const query = {
            workStatus: 'completed'
          };
          
          if (search) {
            query.$or = [
              { workName: new RegExp(search, 'i') },
              { workType: new RegExp(search, 'i') },
            ];
          }
          
          if (role === 'client') {
            query.clientId = Id;
          } else if (role === 'developer') {
            query.developerId = Id;
          } 
          
          const count = await Work.countDocuments(query);
          
          const result = await Work.find(query)
            .populate('clientId', '_id name avatar email')
            .populate('paymentId')
            .populate(`${role==='client'?'clientReview':'developerReview'}`)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({updatedAt:-1})
          
    const data = result.map(work => ({
      ...work.toObject(),
      clientId: {
        _id:work.clientId._id,
        name: work.clientId.name,
        avatar: work.clientId.avatar,
        email:work.clientId.email
      },
      paymentId:work.paymentId
    }));
    return {count,data}
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

    async findWorkByDeveloperId(id,role){
      let query={}
    
       if(role==='client'){
        query.clientId=id
       }else{
        query.developerId=id
       }
      const stats = await Work.aggregate([
        {
          $match: query,
        },
        {
          $group: {
            _id: null,
            committedProjects: { $sum: 1 },
            completedProjects: {
              $sum: {
                $cond: { if: { $eq: ["$workStatus", "completed"] }, then: 1, else: 0 }
              }
            }
          }
        }
      ]);
      return stats.length > 0 ? stats[0] : { committedProjects: 0, completedProjects: 0 };
    

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
          developerEmail:bidDetails.developerEmail,
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
        { workStatus: 'completed' }, 
        { developer: id }
      ]
    });
   }

   async findTotalWorks(){
    return await Work.find().count()
}

  async findTopThreeClientsAndDevelopers(){
    const topClients = await Work.aggregate([
      { $group: { _id: "$clientId", projectCount: { $sum: 1 } } },
      { $sort: { projectCount: -1 } },
      { $limit: 3 },
      { $addFields: { 
        _id: { $toObjectId: "$_id" }
      }
    },
      { $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'clientDetails'
        }
      },
      { $unwind: '$clientDetails' },
      { $project: {
          _id: 0,
          clientId: '$_id',
          projectCount: 1,
          clientName: '$clientDetails.name',
          clientEmail: '$clientDetails.email',
          clientPhoto: '$clientDetails.avatar'
        }
      }
    ]);

    // Aggregate top 3 developers
    const topDevelopers = await Work.aggregate([
      { $match: { developerId: {$exists: true} } },
      
      { $group: { _id: "$developerId", projectCount: { $sum: 1 } } },
      
      { $sort: { projectCount: -1 } },
      
      { $limit: 3 },

      { $addFields: { 
        _id: { $toObjectId: "$_id" }
      }
    },
      { $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'developerDetails'
        }
      },
     
      { $unwind: '$developerDetails' },
      
      { $project: {
          _id: 0,
          developerId: '$_id',
          projectCount: 1,
          developerName: '$developerDetails.name',
          developerEmail: '$developerDetails.email',
          developerPhoto: '$developerDetails.avatar'
        }
      }
    ]);


    return {
      topClients,
      topDevelopers
    };
  }

}
export default new workRepository()