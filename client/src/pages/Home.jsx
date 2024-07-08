import React, { useState } from "react";
import { useSelector } from "react-redux";

import AdminHome from "../components/AdminHome";
import FilterBox from "../components/Home/FilterBox";
import SearchBar from "../components/Home/SearchBar";
import MiniNav from "../components/Home/MiniNav";
import ProjectDetails from "../components/Home/ProjectDetails";
import ProfileBox from "../components/Home/ProfileBox";
import StatsBox from "../components/Home/StatsBox";

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
              {currentProjects.map((project) => (
                <ProjectDetails key={project.id} {...project} />
              ))}

              {/* Pagination */}
              <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-sm">
                  <li>
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(Math.ceil(projects.length / projectsPerPage)).keys()].map((pageNumber) => (
                    <li key={pageNumber}>
                      <button
                        onClick={() => paginate(pageNumber + 1)}
                        className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === pageNumber + 1 ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" : ""}`}
                      >
                        {pageNumber + 1}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${indexOfLastProject >= projects.length && "opacity-50 cursor-not-allowed"}`}
                      disabled={indexOfLastProject >= projects.length}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
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
