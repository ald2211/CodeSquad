import userRepository from "../repository/user.repository.js";
import bcrypt from 'bcrypt'
import { errorHandler } from "../utils/customError.js";
import jwt from 'jsonwebtoken'

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
        const token = jwt.sign(
          { id: user_Existed[0]._id, role: user_Existed[0].role },
          process.env.JWT_SECRET
        );
        const { password: pass, ...data } = user_Existed[0];
        return {data,token}
    }else{
        const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatePassword, 10);
      
      const newUser=await userRepository.createOAuthUser(name,email,hashedPassword,role,photo)
      const token = jwt.sign(
        { id: newUser._id, role: newUser.role },
        process.env.JWT_SECRET
      );
      const { password: pass, ...data } = newUser._doc;
      return {data,token}
    }
}

async userSignIn({email, password}){
 
    let validUser = await userRepository.findVerifiedUserByEmail(email)
    
    if (validUser.length === 0)
       throw errorHandler(401, "Invalid email or password");

    const validPassword = await bcrypt.compare(password, validUser[0].password);
    if (!validPassword)
        throw errorHandler(401, "Invalid email or password")

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

}

export default new authService()