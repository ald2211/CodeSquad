import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"


const PublicOnly=()=>{
    
    const {currentUser} = useSelector((state)=>state.user)

    return currentUser?<Navigate to='/home' />:<Outlet/>
}

export default PublicOnly