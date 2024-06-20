import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('db connected succefully')
}).catch((err)=>console.log(err))
const app=express()

app.get('/',(req,res)=>{
    res.send('hello')
})

app.listen(3000,()=>{
    console.log('server started')
})