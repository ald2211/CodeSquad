import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "user",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  expiresAt: {
    type: Date,
  },
});

export default mongoose.model("token", tokenSchema);
