import React from 'react'
import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
const Login = () => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
 const navigate=useNavigate()
  


  const handlePasswordBlur = () => {
    setIsPasswordTouched(true);
  };
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
        <form className='flex flex-col gap-1'>
        
        <div>
              <label for="email" class="mb-2  text-sm text-black-600">Email address</label>
              <div className="relative">
                <input onBlur={handlePasswordBlur}   type="email" id="email" name="email" className="peer block w-full rounded-md border border-gray-200 bg-gray-50 p-2 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500" required aria-describedby="email-error" />
                <div className="hidden pointer-events-none absolute top-3 right-0  items-center px-3 peer-invalid:flex">
                  <svg className="h-4 w-4 text-rose-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
                </div>
                <p className="mt-2 hidden  text-xs text-rose-600 peer-invalid:block" id="email-error">invalid email address</p>
              </div>
            </div> 
            <div>
            <label htmlFor="password" className="mb-2 block text-sm text-gray-600">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                
                
                onBlur={handlePasswordBlur}
                className=" block w-full rounded-md border border-gray-200 bg-gray-50 p-2 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                required
                aria-describedby="password-error"
              />
              <div className="pointer-events-none absolute top-3 right-0 hidden items-center px-3 ">
                <svg className="h-4 w-4 text-rose-500 "  width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
              </div>
              <p className="mt-2  text-xs text-rose-600 hidden peer-invalid:block  " id="password-error">password is required</p>
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
