import Token from "../models/token.model.js";
import crypto from "crypto";

export const tokenGenerator = async (user_id) => {
  const tokenString = crypto.randomBytes(16).toString("hex") + user_id;
  const token = new Token({
    userId: user_id,
    token: tokenString,
    createdAt: Date.now(),
    expiresAt: Date.now() + 600000,
  });
  await token.save();
  const link = `http://localhost:3000/api/v1/auth/verification/confirm/${token.token}`;
  return link;
};
