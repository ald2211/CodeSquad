import Education from "../models/education.model.js";

class educationRepository{

    async findAllByUserId(userId){

        return await   Education.aggregate([{ $match: { userId } },]);
    }

    async findByUserIdAndCourse(userId, courseName, collegeName) {
        return await Education.aggregate([
          {
            $match: {
              userId,
              courseName: courseName.trim(),
              collegeName: collegeName.trim(),
            },
          },
        ]);
      }

      async create(newEducation) {
        const education = new Education(newEducation);
        return await education.save();
      }
    
      async findByIdAndUserId(eduId, userId) {
        return await Education.findOne({ _id: eduId, userId });
      }
    
      async updateById(eduId, updatedData) {
        return await Education.findByIdAndUpdate(
          eduId,
          { $set: updatedData },
          { new: true }
        );
      }
    
      async deleteByIdAndUserId(eduId, userId) {
        return await Education.findOneAndDelete({ _id:eduId,userId });
      }
    
}


export default new educationRepository