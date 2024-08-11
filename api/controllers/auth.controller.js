
import { errorHandler } from "../utils/customError.js";
import jwt from "jsonwebtoken";
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
      const { data, accessToken, refreshToken } = await authService.userSignIn(req.body);
      res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      })
      .status(200)
      .json({ success: true, message: "Welcome to Code Squad", data, accessToken });
  } catch (err) {
      console.log("signIn error:", err);
      next(err);
  }
};



export const OAuthSignin = async (req, res, next) => {
  try {
    const {data, accessToken, refreshToken}=await authService.userOAuthSignup(req.body)
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  })
  .status(200)
  .json({ success: true, message: "Welcome to Code Squad", data, accessToken });
    
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


//handling refresh token
export const tokenRefresh = async (req, res, next) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
      return next(errorHandler(400, 'invalid token'));
  }

  try {
      const decoded =  jwt.verify(refreshToken, process.env.JWT_SECRET);
      const newAccessToken = jwt.sign(
          { id: decoded.id, role: decoded.role },
          process.env.JWT_ACCESS_SECRET,
          { expiresIn: '5m' }
      );

      res.status(200).json({ success: true, accessToken: newAccessToken });
  } catch (err) {
      return next(errorHandler(403, 'Forbidden'));
  }
};


export const forgotPassword=async(req,res,next)=>{
  const { mail } = req.body;
  try{
    await authService.handleForgotPassword(mail)
    
    res.status(200).json({ message: 'Password reset link sent to your email' });
  }catch(err){
    console.log('err at forgot password:',err)
    next(err)
  }
}

export const resetPassword=async(req,res,next)=>{

  try{
    const { token } = req.params;
  const { newPassword } = req.body;
    await authService.handleResetPassword(token,newPassword)
    
    res.status(200).json({ success:true,message: 'Password changed successfully' });
  }catch(err){
    console.log('err at reset password:',err)
    if (err.name === 'TokenExpiredError')err.message='Token has expired, please request a new reset link'
    next(err)
  }
}