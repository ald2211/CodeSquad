import Work from "../models/work.model.js";
class workRepository{

    async create(newWork) {
        const work = new Work(newWork);
        return await work.save();
      }
    
    async findWorkById(id){
      return await Work.findOne({workNumber:id})
    }
    async findAllWorksByUserId(Id,page,limit,search,filterSearch,role,miniNavFilter) {
  let query = search
    ? { $or: [{ workName: new RegExp(search, 'i') }, { workType: new RegExp(search, 'i') }]}
    : { };

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
  console.log('mini:',miniNavFilter)
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
}

export default new workRepository()