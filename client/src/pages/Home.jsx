import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/AdminSidebar";
import AdminHome from "../components/AdminHome";

const Home = () => {

  const {currentUser}=useSelector((state)=>state.user)
  return (
    <>
      {currentUser.data.role==='admin'?
      <AdminHome/>
      :
      <h1 className="mt-52 text-center">welcome {currentUser.data.name}to home</h1>
    }
    </>
  );
};

export default Home;
