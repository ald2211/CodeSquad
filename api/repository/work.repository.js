import Work from "../models/work.model.js";
class workRepository{

    async create(newWork) {
        const work = new Work(newWork);
        return await work.save();
      }
    
    async findWorkById(id){
      return await Work.findOne({workNumber:id})
    }
    async findAllWorksByUserId(clientId,page,limit,search) {
      if (!clientId) throw new Error('Client ID is required');
  const query = search
    ? { $or: [{ workName: new RegExp(search, 'i') }, { workType: new RegExp(search, 'i') }], clientId: clientId }
    : { clientId: clientId };

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