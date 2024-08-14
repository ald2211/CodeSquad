import Message from "../models/message.model.js";

class messageReopository {
  async create(messageData) {
    const newMessage = new Message(messageData);
    return await newMessage.save();
  }

  async updateMany(messageIds, userId) {
    return await Message.updateMany(
      { _id: { $in: messageIds }, receiverId: userId, read: false },
      { $set: { read: true } }
    );
  }

  async findByMessageIdAndUpdate(id) {
    return await Message.findByIdAndUpdate(id, { read: true }, { new: true });
  }
}

export default new messageReopository();
