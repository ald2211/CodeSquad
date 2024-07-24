import React, { useEffect, useState } from "react";
import Sidebar from "./AdminSidebar";
import { getAllUsers, getAllWorksAdmin, updateUserState, updateWorkStatusAdmin } from "../api/service";
import Pagination from "./UserTablePagination";
import Modal from "react-modal";
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
  const handleProjectState=async(workNumber,key)=>{
    const res=await updateWorkStatusAdmin(workNumber)
   
    if(res.data.success){
      const updatedWorkData = [...userWorks];
      updatedWorkData[key].workStatus = 'completed';
      
      setUserWorks(updatedWorkData);
     Success(res.data.message);
    }
  }
  return (
    <>
      <div className="flex flex-row mt-[80px] hide-scrollbar overflow-hidden">
        <Sidebar />
        <div className="flex-1 -m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <div className="py-3 px-4">
                <div className="relative max-w-xs">
                  <label
                    htmlFor="hs-table-with-pagination-search"
                    className="sr-only"
                  >
                    Search
                  </label>
                  <input
                    type="text"
                    name="hs-table-with-pagination-search"
                    onChange={(e) => setSearch(e.target.value)}
                    id="hs-table-with-pagination-search"
                    className="py-2 px-3 z-0 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-0 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    placeholder="Search for projects"
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden">
                {userWorks.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No users found.
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Project
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Client
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Developer
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Delivery In(days)
                        </th>
                        
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userWorks.map((work, key) => (
                        <tr key={work._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {work.workName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={work.clientId.avatar}
                                  alt=""
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
                                    className="h-10 w-10 rounded-full"
                                    src={
                                      work.bids.filter(
                                        (dev) =>
                                          dev.developer === work.developerId
                                      )[0].developerPhoto
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {
                                      work.bids.filter(
                                        (dev) =>
                                          dev.developer === work.developerId
                                      )[0].developerName
                                    }
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {
                                      work.bids.filter(
                                        (dev) =>
                                          dev.developer === work.developerId
                                      )[0]?.developerEmail
                                    }
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="ml-8"> -</div>
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                            {work.bids.filter(
                              (dev) => dev.developer === work.developerId
                            )[0]?.deliveryTime || "-"}
                          </td>
                          {
                            work.workStatus!=='pending'&&
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                           {
                           work.workStatus==='completed'?
                           <p className={'ml-2 text-green-600 '}>
                           Completed
                         </p>
                           :
                           <p onClick={() => handleProjectState(work.workNumber,key)} className={' text-blue-600 text-xs hover:text-blue-900 cursor-pointer'}>
                           Update
                         </p>
                           }
                          </td>
                          }
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
      </div>
    </>
  );
};

export default ManageProjects;
