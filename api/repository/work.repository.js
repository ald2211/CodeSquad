import Work from "../models/work.model.js";
class workRepository{

    async create(newWork) {
        const work = new Work(newWork);
        return await work.save();
      }
    
    async findWorkById(id){
      return await Work.findOne({workNumber:id})
    }
    async findAllWorksByUserId(clientId,page,limit,search,filterSearch) {
      if (!clientId) throw new Error('Client ID is required');
  let query = search
    ? { $or: [{ workName: new RegExp(search, 'i') }, { workType: new RegExp(search, 'i') }], clientId: clientId }
    : { clientId: clientId };

   console.log('filterSearch:',filterSearch)
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
    const count = await Work.countDocuments(query);
    const data = await Work.find(query)
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
    
}

export default new workRepository()