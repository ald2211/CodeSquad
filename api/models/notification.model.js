import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  receiverId: {
    type: String,
    ref: "User",
  },
  message: {
    type: String,
  },

  read: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("notification", notificationSchema);
