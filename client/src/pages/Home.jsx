import React, { useState } from "react";
import { useSelector } from "react-redux";

import AdminHome from "../components/Home/AdminHome";
import FilterBox from "../components/Home/FilterBox";
import SearchBar from "../components/Home/SearchBar";
import MiniNav from "../components/Home/MiniNav";
import ProjectDetails from "../components/Home/ProjectDetails";
import ProfileBox from "../components/Home/ProfileBox";
import StatsBox from "../components/Home/StatsBox";
import WorksPagination from "../components/Home/WorksPagination";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10; // Number of projects per page

  // Dummy data for projects (replace with actual data from Redux or API)
  const projects = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    projectName: `Project ${index + 1}`,
    postedDate: `2023-07-${index + 1}`,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    budget: `$${Math.floor(Math.random() * 10000)}`,
    bidEndDate: `2023-07-${index + 15}`,
    totalBids: Math.floor(Math.random() * 20),
  }));

  // Logic to calculate pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  // Function to handle page change and scroll to top
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {currentUser.data.role === "admin" ? (
        <AdminHome />
      ) : (
        <div className="min-h-screen bg-gray-100 p-4 mt-[90px]">
          <div className=" flex flex-col lg:flex-row">
            {/* Left Section */}
            <div className="w-full lg:w-1/4 p-4">
              <FilterBox />
            </div>

            {/* Middle Section */}
            <div className="w-full lg:w-2/4 p-4">
              <SearchBar />
              <MiniNav />
              <ProjectDetails/>

              {/* Pagination */}
              <WorksPagination
              currentPage={currentPage}
              />
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/4 p-4">
              <ProfileBox />
              <StatsBox />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
