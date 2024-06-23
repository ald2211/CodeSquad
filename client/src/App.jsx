import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Public from './pages/Public'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home'

const App = () => {
  return (
    <div>
     <ToastContainer />
      <Routes>
        < Route path='/' element={<Public />}/>
        < Route path='/signup' element={<Signup />}/>
        < Route path='/login' element={<Login />}/>
        < Route path='/profile' element={<Profile />}/>
        < Route path='/home'  element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
