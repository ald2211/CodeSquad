import React, { useEffect, useState } from "react";
import Sidebar from "./AdminSidebar";
import {
  getAllWorksAdmin,
  updateWorkStatusAdmin,
} from "../api/service";
import Pagination from "./UserTablePagination";
import { Success } from "../helper/popup";

const ManageProjects = () => {
  const [userWorks, setUserWorks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    getAllWorksAdmin(currentPage, itemsPerPage, search)
      .then((res) => {
        const { data, totalPages, totalItems } = res.data;
        setUserWorks(data);
        setTotalPages(totalPages);
        setTotalItems(totalItems);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((err) => console.log(err));
  }, [currentPage, itemsPerPage, search]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleProjectState = async (workNumber, key) => {
    const res = await updateWorkStatusAdmin(workNumber);
    if (res.data.success) {
      const updatedWorkData = [...userWorks];
      updatedWorkData[key].workStatus = "completed";
      setUserWorks(updatedWorkData);
      Success(res.data.message);
    }
  };

  return (
    <div className="flex flex-row mt-[80px] overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-x-auto p-4">
        <div className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Manage Projects
            </h1>
            <div className="relative max-w-xs">
              <input
                type="text"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                id="search"
                className="block w-full py-2 px-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for projects"
              />
              <div className="absolute inset-y-0 left-0 pl-1 pt-[1px] flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5  text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {userWorks.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No projects found.
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Developer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivery In (days)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userWorks.map((work, key) => (
                    <tr key={work._id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{work.workName}<span className="text-xs pl-1 font-normal text-gray-700">({work.workNumber.toUpperCase()})</span></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={work.clientId.avatar}
                              alt={work.clientId.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {work.clientId.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {work.clientId.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {work.developerId ? (
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={
                                  work.bids.find(
                                    (dev) => dev.developer === work.developerId
                                  )?.developerPhoto
                                }
                                alt={
                                  work.bids.find(
                                    (dev) => dev.developer === work.developerId
                                  )?.developerName
                                }
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {
                                  work.bids.find(
                                    (dev) => dev.developer === work.developerId
                                  )?.developerName
                                }
                              </div>
                              <div className="text-sm text-gray-500">
                                {
                                  work.bids.find(
                                    (dev) => dev.developer === work.developerId
                                  )?.developerEmail
                                }
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 ml-8">-</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            work.workStatus === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : work.workStatus === "committed"
                              ? "bg-orange-100 text-orange-800"
                              : work.workStatus === "completed"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }`}
                        >
                          {work.workStatus === "pending"
                            ? "Pending"
                            : work.workStatus === "committed"
                            ? "Committed"
                            : work.workStatus === "completed"
                            ? "Completed"
                            : ""}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {work.bids.find(
                          (dev) => dev.developer === work.developerId
                        )?.deliveryTime || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                        {work.workStatus === "committed" && (
                          <p
                            onClick={() => handleProjectState(work.workNumber, key)}
                            className="text-blue-600 hover:text-blue-900 cursor-pointer"
                          >
                            Update
                          </p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageProjects;
