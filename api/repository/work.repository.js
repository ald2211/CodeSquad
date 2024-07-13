import Work from "../models/work.model.js";
class workRepository{

    async create(newWork) {
        const work = new Work(newWork);
        return await work.save();
      }
    
    async findWorkById(id){
      return await Work.findOne({workNumber:id})
    }
    async findAllWorksByUserId(clientId) {
      return await Work.aggregate([{ $match: { clientId } }]);
    }

    async findByWorkIdAndUpdate(workNumber, updateData) {
       console.log('workNumber:',workNumber)
       return await Work.updateOne({workNumber:workNumber}, { $set:updateData });
    }
    
}

export default new workRepository()