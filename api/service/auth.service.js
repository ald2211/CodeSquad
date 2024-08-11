import userRepository from "../repository/user.repository.js";
import bcrypt from 'bcrypt'
import { errorHandler } from "../utils/customError.js";
import jwt from 'jsonwebtoken'
import verifyEmail from "../utils/sendMail.js";

class authService{

    async userSignUp({name,email,password,username,role}){

        if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) throw errorHandler(400, "Invalid email address");
    
        if (!password || password.length < 8) throw errorHandler(400, "Password must be at least 8 characters long")
      
        if (!username || username.trim().length < 2) throw errorHandler(400, "Name must be at least 2 characters long");

        if (!role || (role !== "developer" && role !== "client"))throw errorHandler(400, "invalid role")
            
        const userExisted= await userRepository.findByEmail(email)
        console.log("user", userExisted);
        if (userExisted.length > 0) {
        if (userExisted[0].verified) {
        throw errorHandler(400, "email already in use")
      } else {
        await userRepository.deleteTokenByUserId(userExisted[0]._id )
        await userRepository.deleteUserByEmail(email)
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    return await userRepository.createUser(username, email, hashedPassword, role)
}

async activateUser(token){

    const existedToken=await userRepository.findToken(token)
    const currentDate = Date.now();
    if (existedToken.length === 0 || existedToken[0].expiresAt < currentDate){
        return false
    }else{
        await userRepository.updateUserVerification(existedToken[0].userId)
        await userRepository.deleteTokenById(existedToken[0]._id)
        return true
    }   
}

async userOAuthSignup({name, email, photo, role}){

    const user_Existed = await userRepository.findByEmail(email)
    if (user_Existed.length > 0 && user_Existed[0].verified) {
      
      if (!user_Existed[0].userState)
        throw errorHandler(403, "the Account is Blocked please contact Admin");

      const accessToken = jwt.sign(
        { id: user_Existed[0]._id, role: user_Existed[0].role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '5m' }
    );
  
    const refreshToken = jwt.sign(
      { id: user_Existed[0]._id, role: user_Existed[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
  );
        const { password: pass, ...data } = user_Existed[0];
        return {data,accessToken,refreshToken}
    }else{
        const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatePassword, 10);
      
      const newUser=await userRepository.createOAuthUser(name,email,hashedPassword,role,photo)
      
      const accessToken = jwt.sign(
        { id: newUser._id, role: newUser.role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '5m' }
    );
  
    const refreshToken = jwt.sign(
      { id: validUser[0]._id, role: validUser[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
  );
      const { password: pass, ...data } = newUser._doc;
      return {data,accessToken,refreshToken}
    }
}

async userSignIn({email, password}){
 
    let validUser = await userRepository.findVerifiedUserByEmail(email)
    
    if (validUser.length === 0)
       throw errorHandler(401, "Invalid email or password");

    const validPassword = await bcrypt.compare(password, validUser[0].password);
    if (!validPassword)
        throw errorHandler(401, "Invalid email or password")

    console.log('state:',validUser.userState)
    if (!validUser[0].userState)
      throw errorHandler(403, "the Account is Blocked please contact Admin");
    

    const accessToken = jwt.sign(
      { id: validUser[0]._id, role: validUser[0].role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '5m' }
  );

  const refreshToken = jwt.sign(
    { id: validUser[0]._id, role: validUser[0].role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
);

    const { password: pass, ...data } = validUser[0];
    return {data,accessToken,refreshToken}
}

  async verifyUserState(id){

      return await userRepository.findUserById(id)
  }

  async handleForgotPassword(email){
    const user = await userRepository.findByEmail(email)
    
    if (user.length===0) throw errorHandler(404,'User not found') 

    const token = jwt.sign({ id: user[0]._id }, process.env.JWT_RESET_SECRET, { expiresIn: '10m' });
    const subject='Password Reset Request'
    const htmlData= `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }
                .email-container {
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                    width: 100%;
                }
                .email-header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .email-header img {
                    max-width: 100px;
                }
                .email-content {
                    font-size: 16px;
                    color: #333333;
                    line-height: 1.6;
                }
                .email-content h5 {
                    font-size: 18px;
                    margin-top: 0;
                    color: #555555;
                }
                .email-content p {
                    margin: 0 0 10px;
                }
                .email-content a {
                    color: #1a73e8;
                    text-decoration: none;
                }
                .email-content a:hover {
                    text-decoration: underline;
                }
                .email-footer {
                    margin-top: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #888888;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">
                     <img src="http://localhost:3000/images/codeSquadLogo.png" alt="Company Logo" >
                </div>
                <div class="email-content">
                    <p>Hi ${user[0].name},</p>
                    <p>You requested to reset your password. Please click the link below to reset it:</p>
                    <h5><a href="http://localhost:5173/resetPassword/${token}" target="_blank">Reset Your Password</a></h5>
                    <p>If you did not request a password reset, please ignore this email or contact support if you have any concerns.</p>
                </div>
                <div class="email-footer">
                    <p>Thank you,<br>CodeSquad Team</p>
                </div>
            </div>
        </body>
        </html>`
    await verifyEmail(email, '', '',htmlData,subject);
    
  }

  async handleResetPassword(token,newPassword){

    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
    if (!decoded) throw errorHandler(400,'token verification failed, please try again') 
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result=await userRepository.findByIdAndUpdate(decoded.id, { password: hashedPassword });
    if (!result) throw errorHandler(400,'reset password failed') 
  }

}


export default new authService()