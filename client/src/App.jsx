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
import ProtectedRoute from './components/PrivateRoutes/ProtectedRoute'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import PublicOnly from './components/PrivateRoutes/PublicOnly'

const App = () => {
  const {currentUser}=useSelector((state)=>state.user)
  return (
    <div>
     <ToastContainer />
     {currentUser && <Navbar />}
      <Routes>
        <Route element={<PublicOnly/>}>
        < Route path='/' element={<Public />}/>
        < Route path='/signup' element={<Signup />}/>
        < Route path='/login' element={<Login />}/>
        </Route>
        <Route element={<ProtectedRoute/>}>
        < Route path='/profile' element={<Profile />}/>
        < Route path='/home'  element={<Home/>}/>
        < Route path='/committed'  element={<Committed/>}/>
        < Route path='/closed'  element={<Closed/>}/>
        < Route path='/info'  element={<Info/>}/>
        < Route path='/notification'  element={<Notification/>}/>
        < Route path='/messages'  element={<Messages/>}/>
        </Route>
      </Routes>
      < Footer />
    </div>
  )
}

export default App
