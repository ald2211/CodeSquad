import express from "express";
import {
  signup,
  activate,
  signin,
  OAuthSignin,
  signout,
  tokenRefresh,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

//signup
router.post("/signup", signup);

//activate user account after mail verification
router.get("/verification/confirm/:token", activate);

//signin
router.post("/signin", signin);

//OAuth signin
router.post("/OAuth", OAuthSignin);

//signout
router.get("/signout", signout);

//token refresh
router.get("/refreshToken", tokenRefresh);

router.post("/forgotPassword", forgotPassword);

router.post("/resetPassword/:token", resetPassword);

export default router;
