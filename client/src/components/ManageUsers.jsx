import React, { useEffect, useState } from 'react';
import Sidebar from './AdminSidebar';
import { getAllUsers, updateUserState } from '../api/service';
import Pagination from './UserTablePagination';
import Modal from "react-modal";
import { Success } from '../helper/popup';


const ManageUsers = () => {
  const [userData, setUserData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserDetails,setSelectedUserDetails] = useState({});
  const [search,setSearch]=useState('')
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const itemsPerPage = 10; // Number of items per page


  const openDeleteModal = async(id,userState,key) => {

    
    setSelectedUserDetails({id,userState,key}) 
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    
    setIsDeleteModalOpen(false);
  };

  const handleDelete=async()=>{

    closeDeleteModal()
    const res=await updateUserState(selectedUserDetails.id,selectedUserDetails.userState)
   
     if(res.data.success){
        
         const updatedUserData = [...userData];
      updatedUserData[selectedUserDetails.key].userState = res.data.userState;
      
      setUserData(updatedUserData);
      console.log('respooonseeee:', updatedUserData[selectedUserDetails.key].userState);
      Success(res.data.message);
     }
  }

  useEffect(() => {
    getAllUsers(currentPage,itemsPerPage)
      .then((res) => {
        const { data, totalPages, totalItems } = res.data;
        setUserData(data);
        setTotalPages(totalPages);
        setTotalItems(totalItems);
      })
      .catch((err) => console.log(err));
  }, [currentPage, itemsPerPage]);
  console.log('userData:',userData)

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex flex-row mt-[80px]">
        <Sidebar />
        <div className="flex-1 -m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <div className="py-3 px-4">
                <div className="relative max-w-xs">
                  <label htmlFor="hs-table-with-pagination-search" className="sr-only">
                    Search
                  </label>
                  <input
                    type="text"
                    name="hs-table-with-pagination-search"
                    onChange={(e)=>setSearch(e.target.value)}
                    id="hs-table-with-pagination-search"
                    className="py-2 px-3 z-0 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-0 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    placeholder="Search for users"
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
                <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userData.filter((item)=>search.toLowerCase()===''?item:item.name.toLowerCase().includes(search)).map((user,key) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.userState?' bg-green-100 text-green-800':' bg-red-100 text-red-800'}`}>
                            {user.userState?'Active':'Blocked'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <p onClick={()=>openDeleteModal(user._id,user.userState,key)} className={`ml-2 ${user.userState?' text-red-600 hover:text-red-900':'text-blue-600 hover:text-blue-900'} pl-2 cursor-pointer`}>{user.userState?'Block':'Unblock'}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
      {/* delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={closeDeleteModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {`Are you sure you want to ${selectedUserDetails.userState?'Block':'Unblock'}  this User`}
              </h3>
              <button
                onClick={handleDelete}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={closeDeleteModal}
                type="button"
                className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ManageUsers;
