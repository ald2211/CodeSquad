import React, { useState } from "react";
import { useSelector } from "react-redux";

import AdminHome from "../components/Home/AdminHome";
import FilterBox from "../components/Home/FilterBox";
import ProjectDetails from "../components/Home/ProjectDetails";
import ProfileBox from "../components/Home/ProfileBox";
import StatsBox from "../components/Home/StatsBox";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {currentUser.data.role === "admin" ? (
        <AdminHome />
      ) : (
       <div className="min-h-screen bg-gray-100 p-4 mt-[90px]">
  <div className="flex flex-col lg:flex-row">
    {/* Right Section */}
    <div className="w-full lg:w-1/4 p-4 order-1">
      <ProfileBox />
      <StatsBox />
    </div>

    {/* Left Section */}
    <div className="w-full lg:w-1/4 p-4 order-2">
      <FilterBox />
    </div>

    {/* Middle Section */}
    <div className="w-full lg:w-2/4 p-4 order-3">
      <ProjectDetails />
    </div>
  </div>
</div>

      )}
    </>
  );
};

export default Home;
