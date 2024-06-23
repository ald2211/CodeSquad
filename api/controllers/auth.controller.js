import user from "../models/user.model.js"
import {errorHandler} from '../utils/customError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Token from "../models/token.model.js"
import verifyEmail from "../utils/sendMail.js"
import { tokenGenerator } from "../helpers/tokenGenerator.js"

import path from 'path';



export const signup=async(req,res,next)=>{

    const {username,email,password,role}=req.body
    
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
                password:hashPassword
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