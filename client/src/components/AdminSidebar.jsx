import React, { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { HiOutlineUsers, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  processStart,
  signoutSuccess,
  processFailed,
} from "../Redux/user/userSlice";
import { Failed } from "../helper/popup";
import { userLogout } from "../api/service";
import { PiVideoConferenceLight } from "react-icons/pi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current location

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      dispatch(processStart());
      const res = await userLogout();
      if (!res.data.success) {
        dispatch(processFailed());
        Failed("Some error occurred");
        return;
      }
      dispatch(signoutSuccess());
    } catch (err) {
      dispatch(processFailed());
      Failed("Signout failed");
    }
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
      : "";

  return (
    <>
      <aside
        className="left-0 w-64 min-h-screen hidden md:hidden lg:block pt-5 transition-transform transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-screen px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/home"
                className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive(
                  "/home"
                )}`}
              >
                <RxDashboard className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/userManagement"
                className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive(
                  "/admin/userManagement"
                )}`}
              >
                <HiOutlineUsers className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  User Management
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/paymentManagement"
                className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive(
                  "/admin/paymentManagement"
                )}`}
              >
                <MdPayment className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Payments Management
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/projectManagement"
                className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive(
                  "/admin/projectManagement"
                )}`}
              >
                <GoProjectSymlink className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Projects Management
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/videoConference"
                className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive(
                  "/admin/videoConference"
                )}`}
              >
                <PiVideoConferenceLight className="flex-shrink-0 w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Conference Room
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/chat"
                className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive(
                  "/admin/chat"
                )}`}
              >
                <HiOutlineChatBubbleLeftRight className="flex-shrink-0 w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400" />
                <span className="flex-1 ms-3 whitespace-nowrap">Chat Room</span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoLogOutOutline className="flex-shrink-0 w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400" />
                <span
                  onClick={handleSignOut}
                  className="flex-1 ms-3 whitespace-nowrap"
                >
                  Sign Out
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
