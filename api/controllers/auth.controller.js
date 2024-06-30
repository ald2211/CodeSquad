import user from "../models/user.model.js"
import {errorHandler} from '../utils/customError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Token from "../models/token.model.js"
import verifyEmail from "../utils/sendMail.js"
import { tokenGenerator } from "../helpers/tokenGenerator.js"




export const signup=async(req,res,next)=>{

    const {username,email,password,role}=req.body
    console.log('body:',req.body)
    try{
        if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return next(errorHandler(400,'Invalid email address'))
          }
        
          if (!password || password.length < 8) {
            return next(errorHandler(400,'Password must be at least 8 characters long'))
          }
        
          if (!username || username.trim().length < 2) {
            return next(errorHandler(400,'Name must be at least 2 characters long'))
          }

          if (!role || (role !== 'developer' && role !== 'client'))return next(errorHandler(400,'invalid role'))
          
        const userExisted=await user.aggregate([{$match:{email:email}}])
        console.log('user',userExisted)
        if(userExisted.length>0){
            
            if(userExisted[0].verified){
                next(errorHandler(400,'email already in use'))
                return;
            }else{
                 
                 await Token.deleteOne({userId:userExisted[0]._id})
                 await user.deleteOne({email:email})
                 
            }
            
        }
            const hashPassword=await bcrypt.hash(password,10)
            const newUser=new user({
                name:username,
                email,
                password:hashPassword,
                role:role
            })
            await newUser.save()
    
            //generate token for the new user
             const link=await tokenGenerator(newUser._id)
             await verifyEmail(email,link,newUser.name)
            res.status(200).json({'success':true,'message':'Please check your email and verify your address'})
        
    }catch(err){

        console.log('catchError:',err)
        next(err)
    }
}

export const activate=async(req,res,next)=>{

    try{

        const token=await Token.aggregate([{$match:{token:req.params.token}}])
        console.log('token:',token)
        const currentDate=Date.now()
        if(token.length===0||token[0].expiresAt<currentDate)return res.redirect('/emailFailed.html')
        
        await user.updateOne({_id:token[0].userId},{$set:{verified:true}})
        await Token.deleteOne({_id:token[0]._id})
        
        res.redirect('/emailSuccess.html')

    }catch(err){

        console.log('catchError:',err)
        next(err)
    }
}

export const signin=async (req,res,next)=>{

    const {email,password}=req.body;
    try{
        let validUser=await user.aggregate([{$match:{email,verified:true}}])
        console.log('user:',validUser[0])
        if(validUser.length===0)return next(errorHandler(401,'Invalid email or password'))
        
        const validPassword=await bcrypt.compare(password,validUser[0].password)
        if(!validPassword)return next(errorHandler(401,'Invalid email or password'))

        const token=jwt.sign({id:validUser[0]._id,role:validUser[0].role},process.env.JWT_SECRET)
        const {password:pass,...data}=validUser[0]
        res.cookie('access_token',token,{httpOnly:true,expires: new Date(Date.now()+24*60*60*1000)})
           .status(200)
           .json({'success':true,'message':'welcome to code Squad',data})

    }catch(err){

        console.log('signIn error:',err)
        next(err)
    }
}

export const OAuthSignin=async(req,res,next)=>{

    const {name,email,photo,role}=req.body
    try{

        const user_Existed=await user.aggregate([{$match:{email}}]) 
        if(user_Existed.length>0 && user_Existed[0].verified){

            const token= jwt.sign({id:user_Existed[0]._id,role:user_Existed[0].role},process.env.JWT_SECRET)
            
            const {password:pass,...data}=user_Existed[0]

            res.cookie('access_token',token,{httpOnly:true,expires: new Date(Date.now()+24*60*60*1000)})
               .status(200)
               .json({'success':true,'message':'welcome to code Squad',data})
        }else{
            
            const generatePassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8)
            const hashedPassword=await bcrypt.hash(generatePassword,10)
            const newUser=await user({
                name:name.split(' ').join('').toLowerCase()+Math.random().toString(36).slice(-3),
                email,
                password:hashedPassword,
                verified:true,
                role:role?'client':'developer',
                avatar:photo
            })
            newUser.save()
            
            const token=jwt.sign({id:newUser._id,role:newUser.role},process.env.JWT_SECRET)
            const {password:pass,...data}=newUser._doc
            res.cookie('access_token',token,{httpOnly:true,expires:new Date(Date.now()+24*60*60*1000)})
               .status(200)
               .json({'success':true,'message':'welcome to code Squad',data})
        }
    }catch(err){
        console.log('errorAtAuthLogin:',err)
        next(err)
    }
}

export const signout=async(req,res,next)=>{

    try{
        res.clearCookie('access_token')
        res.status(200).json({success:true,message:'logout successfully'})
    }catch(err){
        console.log('error at signout:',err)
        next(err)
    }
}