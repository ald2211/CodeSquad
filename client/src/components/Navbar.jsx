import React, {useState } from "react";
import { Link,NavLink, useLocation, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { userLogout } from "../api/service";
import { processFailed, processStart, signoutSuccess } from "../Redux/user/userSlice";
import { Failed } from "../helper/popup";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate=useNavigate()
  const location=useLocation()
  const {currentUser}=useSelector((state)=>state.user)
  const dispatch=useDispatch()

  const handleSignOut = async () => {
    try {
      dispatch(processStart());
      const res = await userLogout();
      if (!res.data.success) {
        dispatch(processFailed());
        Failed('Some error occurred');
        return;
      }
      dispatch(signoutSuccess());
    } catch (err) {
      console.log('signout err:', err);
      dispatch(processFailed());
      Failed('Signout failed');
    }
  };
  return (
    <>
      <header className={`fixed w-full top-[0] mb-4  pb-2  z-[2] bg-white lg:pb-0 ${currentUser.data.role==='admin'&& 'border-[1px]'}`}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* <!-- lg+ --> */}
          <nav className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <Link to='/projects' title="" className="flex">
                <h1 className=" text-3xl font-mono lg:text-5xl">CodeSquad</h1>
              </Link>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            >
              {menuOpen ? (
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>

            {
              currentUser.data.role!=='admin'&&
              <div className="hidden lg:flex lg:items-center  lg:space-x-10">
            <NavLink
  to="/home"
  className={({ isActive }) =>
    `relative text-base font-medium transition-all duration-200 hover:text-blue-600 ${
      !isActive ? 'text-black' : 'text-blue-600'
    }`
  }
>
  {({ isActive }) => (
    <>
      <span
        className={`absolute bottom-[-8px] left-0 w-full h-[2px] rounded-lg bg-black ${
          isActive ? 'block' : 'hidden'
        }`}
      ></span>
      Ongoing
    </>
  )}
</NavLink>

<NavLink
  to="/committed"
  className={({ isActive }) =>
    `relative text-base font-medium transition-all duration-200 hover:text-blue-600 ${
      !isActive ? 'text-black' : 'text-blue-600'
    }`
  }
>
  {({ isActive }) => (
    <>
      <span
        className={`absolute bottom-[-8px] left-0 w-full h-[2px] rounded-lg bg-black ${
          isActive ? 'block' : 'hidden'
        }`}
      ></span>
      Committed
    </>
  )}
</NavLink>

<NavLink
  to="/closed"
  className={({ isActive }) =>
    `relative text-base font-medium transition-all duration-200 hover:text-blue-600 ${
      !isActive ? 'text-black' : 'text-blue-600'
    }`
  }
>
  {({ isActive }) => (
    <>
      <span
        className={`absolute bottom-[-8px] left-0 w-full h-[2px] rounded-lg bg-black ${
          isActive ? 'block' : 'hidden'
        }`}
      ></span>
      Completed
    </>
  )}
</NavLink>

            </div>
            }

             <div className="hidden lg:flex lg:items-center  lg:space-x-5">
                {/* new added */}
             <svg
                onClick={()=>navigate('/info')}
                className={`m-auto w-7 h-7  p-1 rounded-md lg:block text-black hover:border-[2px] border-blue-500 ${location.pathname==='/info'?'bg-blue-400':'bg-gray-300'}`}
                
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <svg
                onClick={()=>navigate('/notification')}
                className={`m-auto w-7 h-7  p-1 rounded-md lg:block text-black hover:border-[2px] border-blue-500 ${location.pathname==='/notification'?'bg-blue-400':'bg-gray-300'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {
                currentUser?
                <>
                  <img onClick={()=>navigate('/profile')} className="rounded-full h-9 w-9 cursor-pointer hover:border-[2px] border-blue-500 object-cover" src={currentUser?.data?.avatar} alt="" />
                </>
                :
                <>
                 <svg
               onClick={()=>navigate('/profile')}
               className={`m-auto w-7 h-7  p-1 rounded-md lg:block text-black hover:border-[2px] border-blue-500 ${location.pathname==='/profile'?'bg-blue-400':'bg-gray-300'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
                </>
              }
              {/* new added */}
             </div>
          </nav>

          {/* <!-- xs to lg --> */}
          <nav
            className={`transition-all duration-1000 ease-in-out max-h-[410px] overflow-hidden pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden absolute w-95  z-[1]   ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <div className="flow-root">
              <div className="flex flex-col px-6 -my-2 space-y-1">
                <Link
                  to='/home'
                  onClick={()=>setMenuOpen(!menuOpen)}
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  {currentUser.data.role==='admin'?'Dashboard':'Projects'}
                </Link>

                <Link
                  to={currentUser.data.role==='admin'?'/admin/userManagement':'/committed'}
                  onClick={()=>setMenuOpen(!menuOpen)}
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  {currentUser.data.role==='admin'?'User Management ':'Committed'}
                </Link>

                <Link
                  to={currentUser.data.role==='admin'?'/admin/projectManagement':'/closed'}
                  onClick={()=>setMenuOpen(!menuOpen)}
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  {currentUser.data.role==='admin'?'Project Management ':'Closed'}
                </Link>
                {
                  currentUser.data.role==='admin'&&
                  <>
                
                <Link
                  to='/admin/paymentManagement'
                  onClick={()=>setMenuOpen(!menuOpen)}
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  Payments Management
                </Link>
                  </>
                }
               
                <Link
                  to='/notification'
                  onClick={()=>setMenuOpen(!menuOpen)}
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  Notification
                </Link>
                {
                    currentUser.data.role==='admin' &&
                    <>
                    <Link 
                  to='/admin/videoConference'
                  onClick={()=>setMenuOpen(!menuOpen)}
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  Conference Room
                </Link>
                     <Link 
                  to='/admin/chat'
                  onClick={()=>setMenuOpen(!menuOpen)}
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  Chat Room
                </Link>
                    </>
                  }
                <Link
                  to='/profile'
                  onClick={()=>setMenuOpen(!menuOpen)}
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex py-2 justify-center rounded-lg font-medium text-white transition-all duration-200 bg-black hover:bg-blue-600"
                >
                  SignOut
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
