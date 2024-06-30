import user from "../models/user.model.js";

class userRepository{

    async findByIdAndUpdate(userId, updateData) {
        return await user.findByIdAndUpdate(
          userId,
          { $set: updateData },
          { new: true }
        );
      }

}

export default new userRepository()


  