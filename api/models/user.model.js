import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "developer",
      required: true,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/1144/1144760.png",
    },
    jobRole: {
      type: String,
      default: "your role",
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    rph: {
      type: Number,
      default: 0,
    },
    resume: {
      type: String,
      default: null,
    },
    summary: {
      type: String,
    },
    skills: {
      type: [String],
    },
    userState: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
