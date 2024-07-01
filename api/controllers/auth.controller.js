import user from "../models/user.model.js";
import { errorHandler } from "../utils/customError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Token from "../models/token.model.js";
import verifyEmail from "../utils/sendMail.js";
import { tokenGenerator } from "../helpers/tokenGenerator.js";
import authService from "../service/auth.service.js";


export const signup = async (req, res, next) => {

  try {
    const newUser=await authService.userSignUp(req.body)

    //generate token for the new user
    const link = await tokenGenerator(newUser._id);
    await verifyEmail(req.body.email, link, newUser.name);
    res
      .status(200)
      .json({
        success: true,
        message: "Please check your email and verify your address",
      });
  } catch (err) {
    console.log("catchError:", err);
    next(err);
  }
};

export const activate = async (req, res, next) => {
  try {
    
    const result=await authService.activateUser(req.params.token,res)
    if(!result){
      res.redirect("/emailFailed.html");
    }
    res.redirect("/emailSuccess.html");
  } catch (err) {
    console.log("catchError:", err);
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const {data,token}=await authService.userSignIn(req.body)
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ success: true, message: "welcome to code Squad", data });
  } catch (err) {
    console.log("signIn error:", err);
    next(err);
  }
};

export const OAuthSignin = async (req, res, next) => {
  const { name, email, photo, role } = req.body;
  try {
    const {token,data}=await authService.userOAuthSignup(req.body)
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .status(200)
        .json({ success: true, message: "welcome to code Squad", data });
    
  } catch (err) {
    console.log("errorAtAuthLogin:", err);
    next(err);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ success: true, message: "logout successfully" });
  } catch (err) {
    console.log("error at signout:", err);
    next(err);
  }
};
