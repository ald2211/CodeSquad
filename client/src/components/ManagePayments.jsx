import React, { useEffect, useState } from "react";
import Sidebar from "./AdminSidebar";
import { getAllCompletedWorksAdmin, updatePaymentStatusAdmin, updateWorkStatusAdmin } from "../api/service";
import Pagination from "./UserTablePagination";
import { Success } from "../helper/popup";

const ManagePayments = () => {
  const [userWorks, setUserWorks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    getAllCompletedWorksAdmin(currentPage, itemsPerPage, search)
      .then((res) => {
        const { data, totalPages, totalItems } = res.data;
        console.log('dataaaaaaaaasss:',data)
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

  const handlePaymentForward = async (paymentId, key) => {
    const res = await updatePaymentStatusAdmin(paymentId);
    if (res.data.success) {
      const updatedWorkData = [...userWorks];
      updatedWorkData[key].paymentId.developerPayment = "completed";
      setUserWorks(updatedWorkData);
      Success(res.data.message);
    }
  };

 

  return (
    <div className="flex flex-row mt-[80px] overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-4 overflow-x-auto">
        <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
          <div className="flex justify-between items-center p-4 bg-white">
            <h1 className="text-2xl font-semibold text-gray-900">Manage Payments</h1>
            <div className="relative max-w-xs">
              <input
                type="text"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                className="py-2 px-4 w-full border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                placeholder="Search"
              />
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
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Project Details
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Bidded Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Budget
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Final Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Payment From Client
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Payment To Developer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Developer UPI ID
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userWorks.map((work, key) => (
                    <tr
                      key={work._id}
                      className="hover:bg-gray-50 transition duration-150 ease-in-out"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="text-sm font-medium text-gray-900">
                          {work.workName}
                          <span className="text-xs pl-1 font-normal text-gray-700">({work.workNumber.toUpperCase()})</span>
                        </div>
                        <p>Type: {work.workType}</p>
                        <div className="mt-2">
                          <div className="text-sm font-medium text-gray-700">
                            Client:
                          </div>
                          <div className="flex items-center mt-1 w-[205px]">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={work.clientId.avatar}
                              alt=""
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {work.clientId.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {work.clientId.email}
                              </div>
                            </div>
                          </div>
                        </div>
                        {work.developerId && (
                          <div className="mt-4">
                            <div className="text-sm font-medium text-gray-700">
                              Developer:
                            </div>
                            <div className="flex items-center mt-1">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={
                                  work.bids.find(
                                    (dev) => dev.developer === work.developerId
                                  ).developerPhoto
                                }
                                alt=""
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {
                                    work.bids.find(
                                      (dev) =>
                                        dev.developer === work.developerId
                                    ).developerName
                                  }
                                </div>
                                <div className="text-sm text-gray-500">
                                  {
                                    work.bids.find(
                                      (dev) =>
                                        dev.developer === work.developerId
                                    ).developerEmail
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center pt-[75px]">
                        {work.bids.find(
                          (bid) => bid.developer === work.developerId
                        )?.bidAmount || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center pt-[75px]">
                        {work.budget}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center pt-[75px]">
                        {work.paymentId?.finalAmount || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center pt-[75px]">
                        <span className={`px-3 py-[2px] inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            work.paymentId?.clientPayment === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : 
                              "bg-green-100 text-green-800"
                          }`}>
                            {work.paymentId?.clientPayment}
                          </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center pt-[75px]">
                        <span className={`px-3 py-[2px] inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            work.paymentId?.developerPayment === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : work.paymentId?.developerPayment === "initiated"
                              ? "bg-orange-100 text-orange-800"
                              : work.paymentId?.developerPayment === "completed"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }`}>
                            {work.paymentId?.developerPayment}
                          </span>
                        
                      </td>
                      <td className="px-6 py-4 flex flex-col whitespace-nowrap text-xs text-gray-500 text-center mt-[95px]">
                        {work.paymentId?.upi || "-"}
                        {(work.paymentId?.upi && work?.paymentId?.developerPayment!=='completed')&&(
                          <button
                            onClick={() =>handlePaymentForward(work?.paymentId?._id,key)}
                            className="ml-2 px-3 py-1 text-white bg-blue-600 hover:bg-blue-700 rounded mt-2"
                          >
                            Forward Payment
                          </button>
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

export default ManagePayments;
