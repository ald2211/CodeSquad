import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import adminRouter from './routes/admin.route.js'
import paymentRouter from './routes/payment.route.js'
import cookieParser from 'cookie-parser'


//configue env file
dotenv.config();

const corsOptions = {                             // Configure CORS to allow requests from http://localhost:5173
    origin: "http://localhost:5173",
    credentials: true ,                          // Allow credentials (cookies)
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
 
const app=express()
app.use(cors(corsOptions));                      
app.use(cookieParser())
app.use(express.json())                         // Middleware to parse JSON bodies    
app.use(express.static('api/public'))
                        
//Routes
app.use('/api/v1/auth',authRouter);              //auth router
app.use('/api/v1/user',userRouter);
app.use('/api/v1/admin',adminRouter);
app.use('/api/v1/payment',paymentRouter);



//connect mongodb
mongoose.connect(process.env.MONGO)
.then(()=>console.log('db connected succefully'))
.catch((err)=>console.log(err))

//error handling
// Catch-all route for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error-handling middleware
app.use((err,req,res,next)=>{
  let statusCode=err.statusCode||500
  let message=err.message||'internal server error'
  return res
  .status(statusCode)
  .json({
    success:false,
    statusCode,
    message
  })
})

export default app