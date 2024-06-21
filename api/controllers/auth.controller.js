import user from "../models/user.model.js"
import {errorHandler} from '../utils/customError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const signup=async(req,res,next)=>{

    const {username,email,password,role}=req.body
    try{
        const userExisted=await user.findOne({email:email})
        if(userExisted){
            next(errorHandler(400,'email already in use'))
        }
        const hashPassword=await bcrypt.hash(password,10)
        const newUser=new user({
            name:username,
            email,
            password:hashPassword
        })
        await newUser.save()
        res.status(201).json({'success':true,'message':'user created successfully'})
    }catch(err){

        console.log('catchError:',err)
        next(err)
    }
}