import React from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
const Home = () => {

  const {currentUser}=useSelector((state)=>state.user)
  return (
    <>
      <h1 className="mt-52 text-center">welcome {currentUser.data.name}to home</h1>
    </>
  );
};

export default Home;
