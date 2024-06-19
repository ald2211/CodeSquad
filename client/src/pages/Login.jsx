import React from 'react'
import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import {  useFormik } from 'formik';
import { signupSchema } from '../schemas';
import Input from '../components/Input';
import ShowError from '../components/ShowError';
const Login = () => {
 
const initialValues={
  email:'',
  password:''
}
 const navigate=useNavigate()
 const {values,errors,handleBlur,handleSubmit,touched,handleChange}=useFormik({
    initialValues,
    validationSchema:signupSchema,
    onSubmit:(values)=>{

    }
 })
  

  return (
   <>
    <div className= ' flex justify-between px-2 md:px-11 pt-2'>
       <h1 className='text-xl md:text-3xl font-bold font-mono'>CodeSquad</h1>
    
    </div>
    <div className='  p-3  max-w-lg mx-auto  my-auto'>
        <h1 className='text-black  font-thin text-lg  text-center md:text-2xl my-3'>Login to CodeSquad</h1>
        <button className="w-full text-sm mt-8 flex  items-center justify-center rounded-md border p-2 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-blue-400 hover:text-white"><img className="mr-2 h-4" src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" alt /> Log in with Google</button>
        <button className="w-full text-sm mt-3 flex  items-center justify-center rounded-md border p-2 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-blue-400 hover:text-white"><img className="mr-2 h-4" src="https://www.cdnlogo.com/logos/l/66/linkedin-icon.svg" alt /> Log in with Linkedin</button>
      <div className="relative mt-6 mb-4 flex h-px place-items-center bg-gray-200">
        <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">or</div>
      </div>
        <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
        
        <div>
              <label for="email" class="mb-2  text-sm text-black-600">Email address</label>
              <div className="relative">
              <Input identifier={'email'} value={values.email} handleChange={handleChange} handleBlur={handleBlur} inputType={'email'} />
                { errors.email&&touched.email?<ShowError Error={errors.email} />:null}
              </div>
            </div> 
            <div>
            <label htmlFor="password" className="mb-2 block text-sm text-gray-600">Password</label>
            <div className="relative">
            <Input identifier={'password'} value={values.password} handleChange={handleChange} handleBlur={handleBlur} inputType={'password'} />
              { errors.password&&touched.password?<ShowError Error={errors.password} />:null}
            </div>
          </div>
                  <button type="submit" className="w-full mt-7 rounded-lg bg-blue-500 p-2 text-center text-sm font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 hover:bg-blue-700">Sign In</button>
                  <p className="text-sm mb-3 font-light text-gray-500 dark:text-gray-400">
                       Don't have an account? <Link to='/signup' className="font-semibold  text-primary-600 hover:underline dark:text-primary-500">Sign Up</Link>
                  </p>
        </form>
        
    </div>
   </>
  )
}

export default Login
