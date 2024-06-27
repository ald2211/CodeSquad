import React, { useState } from "react";
import Modal from "react-modal";
import { FiDelete, FiEdit } from "react-icons/fi";
import { useFormik } from "formik";
import { firstSectionSchema } from "../../schemas";
import ShowError from "../ShowError";
import { useSelector } from "react-redux";

const initialValues={
  userRole:'',
  rph:0
}
const DeveloperProfile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const {currentUser}=useSelector((state)=>state.user)
  const {handleChange,
    handleBlur,
    values,
    errors,
    handleSubmit,
    touched,} =useFormik({
      initialValues,
      validationSchema: firstSectionSchema,
      onSubmit: async (values, action) => {
        try {
          console.log(rest);
          const res = await axios.post("/api/v1/users/id", values, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = res.data;
          console.log(data);
          action.resetForm();
          Success(data.message);
         
        } catch (err) {
          Failed(err.response ? err.response.data.message : err.message);
        } 
      },
    })
  const [role, setRole] = useState("Mark Tanker");
  const [hourlyPay, setHourlyPay] = useState("₹5000/hr");

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here, e.g., update the state or make an API call
    closeEditModal();
  };

  const handleDelete = () => {
    // Handle the delete action here, e.g., make an API call
    closeDeleteModal();
  };

  return (
    <section className="mt-4 flex flex-col md:flex-row items-center p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Left div */}
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center flex">
          <img
            className=" lg:self-start object-cover w-32 h-32  rounded-full"
            src={
              currentUser?.user.avatar
            }
            alt="image"
          />
          <p className=" md:text-2xl flex flex-col mt-6 ml-3 lg:text-4xl font-semibold text-black">
            Mark Tanker{" "}
            <span className="font-normal md:text-xl  text-left lg:text-2xl text-gray-600">
              California
            </span>
          </p>
        </div>
      </div>

      {/* Right div */}
      <div className="flex flex-col lg:items-center lg:mr-0 md:mr-0 mr-20  md:items-end md:w-1/2 p-4">
        <div className="flex space-x-1 ">
          {/* Replace with your star icons or use a library like react-icons */}
          <span className="text-yellow-500 text-3xl mb-5 md:text-4xl">★</span>
          <span className="text-gray-300   text-3xl mb-5 md:text-4xl">★</span>
          <span className="text-gray-300   text-3xl mb-5 md:text-4xl">★</span>
          <span className="text-gray-300   text-3xl mb-5 md:text-4xl">★</span>
          <span className="text-gray-300   text-3xl mb-5 md:text-4xl">★</span>
        </div>
        <p className="text-gray-600 text-xl text-center  md:text-3xl md:mr-[41px] lg:text-4xl lg:ml-7 md:text-right">
          ₹5000/hr
        </p>
      </div>
      <div className="flex space-x-2 ml-auto md:mb-auto lg:mb-auto">
        <FiEdit
          className="h-6 w-6 hover:text-blue-500"
          onClick={openEditModal}
        />
        <FiDelete
          className="h-7 w-7 hover:text-red-500"
          onClick={openDeleteModal}
        />
      </div>
        {/* Edit Modal */}
        <Modal 
        isOpen={isEditModalOpen} 
        onRequestClose={closeEditModal} 
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Edit Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                Role
              </label>
              <input
                id="userRole"
                name="userRole"
                type="text"
                value={values.userRole}
                onChange={handleChange}
                onBlur={handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.userRole && touched.userRole ? (
                <ShowError Error={errors.userRole} />
              ) : null}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hourlyPay">
                Hourly Pay
              </label>
              <input
               id="rph"
               name="rph"
               type="number"
               value={values.rph}
               onChange={handleChange}
               onBlur={handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.rph && touched.rph ? (
                <ShowError Error={errors.rph} />
              ) : null}
            </div>
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={closeEditModal} className="text-gray-500 hover:underline">Cancel</button>
              <button type="submit" className="text-blue-500 hover:underline">Save</button>
            </div>
          </form>
        </div>
      </Modal>
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
                Are you sure you want to delete this product?
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
    </section>
  );
};

export default DeveloperProfile;
