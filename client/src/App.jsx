import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Public from './pages/Public'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home'
import Footer from './components/Footer'
import Committed from './pages/Committed'
import Closed from './pages/Closed'
import Info from './pages/Info'
import Notification from './pages/Notification'
import Messages from './pages/Messages'

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
        < Route path='/committed'  element={<Committed/>}/>
        < Route path='/closed'  element={<Closed/>}/>
        < Route path='/info'  element={<Info/>}/>
        < Route path='/notification'  element={<Notification/>}/>
        < Route path='/messages'  element={<Messages/>}/>
      </Routes>
      < Footer />
    </div>
  )
}

export default App
