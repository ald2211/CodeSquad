import Conversation from "../models/conversation.model.js";

class conversationRepository {
  async findConversationByParticipants(senderId, receiverId) {
    return await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
  }
  async findMessages(senderId, receiverId) {
    return await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
  }

  async create(senderId, receiverId) {
    const newConversation = new Conversation({
      participants: [senderId, receiverId],
    });

    return await newConversation.save();
  }

  async saveMessageId(updatedConversation) {
    await updatedConversation.save();
  }

  async findUnreadMessages(receiverId) {
    const unreadCounts = await Conversation.aggregate([
      {
        $match: {
          participants: receiverId,
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "messages",
          foreignField: "_id",
          as: "messageDetails",
        },
      },
      {
        $unwind: "$messageDetails",
      },
      {
        $match: {
          "messageDetails.read": false,
        },
      },
      {
        $group: {
          _id: "$_id",
          unreadCount: { $first: "$unreadCount" },
          participants: { $first: "$participants" },
        },
      },
    ]);

    return unreadCounts;
  }

  async findByMessageId(messageId) {
    return await Conversation.findOne({
      messages: messageId,
    });
  }
}

export default new conversationRepository();
