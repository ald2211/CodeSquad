import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../api/service";
import { processFailed, processStart, signoutSuccess } from "../Redux/user/userSlice";
import { Failed } from "../helper/popup";
import { IoMdNotificationsOutline } from "react-icons/io";
import NotificationDropdown from "./Home/NotificationDropdown";
import { useSocketContext } from "../context/socketContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const  {socket}=useSocketContext()
  const [notification, setNotification] = useState([]);

  
  useEffect(() => {
    socket?.on('newNotification', (newNotification) => {
      console.log('newmsg:', newNotification);
      setNotification(newNotification);
    });
  
    return () => socket?.off('newNotification');
  }, [socket]); 

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
      <header className={`fixed w-full top-[0] mb-4 pb-2 z-[2] bg-white lg:pb-0 ${currentUser.data.role === 'admin' && 'border-b-[1px]'}`}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* lg+ */}
          <nav className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <Link to='/projects' title="" className="flex">
                <h1 className="text-3xl font-mono lg:text-5xl">CodeSquad</h1>
              </Link>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            >
              {/* Hamburger menu icon */}
              {menuOpen ? (
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>

           { currentUser.data.role!=='admin'&&<div className="hidden lg:flex lg:items-center lg:space-x-10">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `relative text-base font-medium transition-all duration-200 hover:text-blue-600 ${!isActive ? 'text-black' : 'text-blue-600'}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute bottom-[-8px] left-0 w-full h-[2px] rounded-lg bg-black ${isActive ? 'block' : 'hidden'}`}
                    ></span>
                    Projects
                  </>
                )}
              </NavLink>

              <NavLink
                to="/committed"
                className={({ isActive }) =>
                  `relative text-base font-medium transition-all duration-200 hover:text-blue-600 ${!isActive ? 'text-black' : 'text-blue-600'}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute bottom-[-8px] left-0 w-full h-[2px] rounded-lg bg-black ${isActive ? 'block' : 'hidden'}`}
                    ></span>
                    Committed
                  </>
                )}
              </NavLink>

              <NavLink
                to="/closed"
                className={({ isActive }) =>
                  `relative text-base font-medium transition-all duration-200 hover:text-blue-600 ${!isActive ? 'text-black' : 'text-blue-600'}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute bottom-[-8px] left-0 w-full h-[2px] rounded-lg bg-black ${isActive ? 'block' : 'hidden'}`}
                    ></span>
                    Completed
                  </>
                )}
              </NavLink>
            </div>}

            <div className="hidden lg:flex lg:items-center lg:space-x-5 relative">
            <div className="relative mr-16">
           <NotificationDropdown newNotification={notification} />
            </div>
              {currentUser ? (
                <div className="relative group">
                  <img
                    className="rounded-full h-9 w-9 cursor-pointer hover:border-[2px] border-blue-500 object-cover"
                    src={currentUser?.data?.avatar}
                    alt="User Avatar"
                  />
                  <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-t-lg"
                    >
                      Profile
                    </Link>
                    <button
                      className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-b-lg"
                      onClick={handleSignOut}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <svg
                  onClick={() => navigate('/profile')}
                  className={`m-auto w-7 h-7 p-1 rounded-md lg:block text-black hover:border-[2px] border-blue-500 ${location.pathname === '/profile' ? 'bg-blue-400' : 'bg-gray-300'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </div>
          </nav>

          {/* xs to lg */}
          <nav
            className={`transition-all duration-1000 ease-in-out max-h-[410px] overflow-hidden pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden absolute w-95 z-[1] ${menuOpen ? "block" : "hidden"}`}
          >
            <div className="flow-root">
              <div className="flex flex-col px-6 -my-2 space-y-1">
                <Link
                  to="/home"
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-t-lg"
                >
                  {currentUser.data.role === 'admin' ? 'Dashboard' : 'Projects'}
                </Link>

                <Link
                  to={currentUser.data.role === 'admin' ? '/admin/userManagement' : '/committed'}
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-t-lg"
                >
                  {currentUser.data.role === 'admin' ? 'User Management ' : 'Committed'}
                </Link>

                <Link
                  to={currentUser.data.role === 'admin' ? '/admin/projectManagement' : '/closed'}
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-t-lg"
                >
                  {currentUser.data.role === 'admin' ? 'Project Management' : 'Completed'}
                </Link>
                {currentUser?.data?.role === 'admin' && (
                  <>
                    <Link
                      to='/admin/paymentManagement'
                      onClick={() => setMenuOpen(!menuOpen)}
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-t-lg"
                    >
                      Payments Management
                    </Link>
                    <Link
                      to='/admin/videoConference'
                      onClick={() => setMenuOpen(!menuOpen)}
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-t-lg"
                    >
                      Conference Room
                    </Link>
                    <Link
                      to='/admin/chat'
                      onClick={() => setMenuOpen(!menuOpen)}
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-t-lg"
                    >
                      Chat Room
                    </Link>
                  </>
                )}
              </div>
              <div className="pt-6 mt-6 border-t border-gray-200">
              <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-t-lg text-center"
                        onClick={() => setMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        className="w-full  block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-b-lg text-center"
                        onClick={() => {
                          handleSignOut();
                          setMenuOpen(false);
                        }}
                      >
                        Logout
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
