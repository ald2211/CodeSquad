import {useSelector} from 'react-redux'
import {Outlet,Navigate } from 'react-router-dom'


const AdminOnly = () => {
  
  const {currentUser}=useSelector((state)=>state.user)

  return currentUser.data.role==='admin'? <Outlet />:<Navigate to='/login' />
}

export default AdminOnly