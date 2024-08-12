import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: String,
      ref: 'user'
    }
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'message'
    }
  ],
  unreadCount: {
    type: Map,
    of: Number,
    default: {}
  },
}, { timestamps: true });

export default mongoose.model('Conversation', conversationSchema);
