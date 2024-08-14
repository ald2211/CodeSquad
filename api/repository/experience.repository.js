import experience from "../models/experience.model.js";

class experienceRepository {
  async findAllByUserId(userId) {
    return await experience.aggregate([{ $match: { userId } }]);
  }

  async findByUserIdAndJob(userId, jobTitle, company) {
    return await experience.aggregate([
      {
        $match: {
          userId,
          jobTitle: jobTitle.trim(),
          company: company.trim(),
        },
      },
    ]);
  }

  async create(newExperience) {
    const Experience = new experience(newExperience);
    return await Experience.save();
  }

  async findByIdAndUserId(expId, userId) {
    return await experience.findOne({ _id: expId, userId });
  }

  async updateById(expId, updatedData) {
    return await experience.findByIdAndUpdate(
      expId,
      { $set: updatedData },
      { new: true }
    );
  }

  async deleteByIdAndUserId(expId, userId) {
    return await experience.findOneAndDelete({ _id: expId, userId });
  }
}

export default new experienceRepository();
