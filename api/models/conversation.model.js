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
  ]
}, { timestamps: true });

export default mongoose.model('Conversation', conversationSchema);
