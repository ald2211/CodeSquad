import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Failed, Success } from "../../helper/popup";
import { ThreeDots } from "react-loader-spinner";
import { experienceSchema } from "../../schemas";
import { MdPostAdd } from "react-icons/md";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { updateExperienceSuccess } from "../../Redux/user/userSlice";
import {
  addExperience,
  deleteExperience,
  editExperience,
  getExperience,
} from "../../api/service";

const ExperienceSection = () => {
  const { currentUser, currentExperience } = useSelector((state) => state.user); // Assuming currentUser is stored in the Redux store

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [newExp, setNewExp] = useState(false);
  const [expLoading,setExpLoading]=useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
  };

  useEffect(() => {
    setExpLoading(true)
    getExperience()
      .then((response) => {
        dispatch(updateExperienceSuccess(response.data));
      })
      .catch((err) => console.log("fetchErrrorExp:", err))
      .finally(()=>setExpLoading(false))
  }, []);

  const openEditModal = (experience) => {
    setSelectedExperience(experience);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedExperience(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (exp_id) => {
    setSelectedId(exp_id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedId(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      closeDeleteModal();
      setExpLoading(true)
      const res = await deleteExperience(id);
      const data = res.data;
      dispatch(updateExperienceSuccess(data));
      Success(data.message);
    } catch (err) {
      console.log(err);
    }finally{
      setExpLoading(false)
    }
  };

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema: experienceSchema,
    onSubmit: async (values, action) => {
      try {
        closeEditModal();
        setExpLoading(true)
        let res;
        if (!newExp) {
          res = await editExperience(
            selectedExperience._id,
            selectedExperience.userId,
            values
          );
        } else {
          res = await addExperience(currentUser.data._id, values);
        }
        const data = res.data;
        dispatch(updateExperienceSuccess(data));
        Success(data.message);
        action.resetForm();
      } catch (err) {
        console.log(err);
      } finally{
        setExpLoading(false)
      }
    },
  });

  useEffect(() => {
    if (selectedExperience) {
      setValues({
        jobTitle: selectedExperience.jobTitle,
        company: selectedExperience.company,
        location: selectedExperience.location,
        startDate: selectedExperience.startDate.split("T")[0],
        endDate: selectedExperience.endDate.split("T")[0],
      });
    } else {
      setValues({
        jobTitle: " ",
        company: " ",
        location: " ",
        startDate: "",
        endDate: "",
      });
    }
  }, [selectedExperience, setValues]);

  return (
    <>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4 relative">
  <h2 className="text-2xl font-semibold mb-2">Experience</h2>

  {expLoading ? (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#3333ff"
        ariaLabel="three-dots-loading"
      />
    </div>
  ) : (
    <>
      {currentExperience?.data?.length > 0 ? (
        currentExperience.data.map((exp, index) => (
          <div
            key={index}
            className="mb-4 p-4 bg-gray-50 rounded-lg relative"
          >
            <div className="grid grid-cols-2 border-[3px] p-4">
              <div className="mb-2">
                <h3 className="text-xl font-medium">Job Title</h3>
                <p className="text-gray-700">{exp.jobTitle}</p>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-medium">Company Name</h3>
                <p className="text-gray-700">{exp.company}</p>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-medium">Company Location</h3>
                <p className="text-gray-700">{exp.location}</p>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-medium">Duration</h3>
                <p className="text-gray-700">
                  {exp.startDate.split("T")[0]} to {exp.endDate.split("T")[0]}
                </p>
              </div>
            </div>
            <div className="absolute top-6 right-6 flex space-x-2">
              <FiEdit
                className="h-6 w-6 hover:text-blue-500 cursor-pointer"
                onClick={() => {
                  setNewExp(false);
                  openEditModal(exp);
                }}
              />
              <FiTrash
                className="h-6 w-6 hover:text-red-500 cursor-pointer"
                onClick={() => openDeleteModal(exp._id)}
              />
            </div>
          </div>
        ))
      ) : (
        <>
          <HiOutlineDocumentAdd
            className="absolute top-[3%] right-[1%] h-8 w-8 hover:text-blue-500"
            onClick={() => {
              setNewExp(true);
              openEditModal();
            }}
          />
          <MdPostAdd
            onClick={() => {
              openEditModal();
              setNewExp(true);
            }}
            className="m-auto h-9 w-9 hover:text-blue-600"
          />
        </>
      )}
      <HiOutlineDocumentAdd
        className="absolute top-[3%] right-[1%] h-8 w-8 hover:text-blue-500"
        onClick={() => {
          openEditModal();
          setNewExp(true);
        }}
      />
    </>
  )}
</div>


      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        className="fixed inset-0 flex items-center justify-center z-50 mt-[80px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold mb-4">
            {!newExp ? "Edit" : "Add"} Experience
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={values.jobTitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.jobTitle && touched.jobTitle && (
                  <div className="text-red-500 text-sm">{errors.jobTitle}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={values.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.company && touched.company && (
                  <div className="text-red-500 text-sm">{errors.company}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Company Location</label>
                <input
                  type="text"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.location && touched.location && (
                  <div className="text-red-500 text-sm">{errors.location}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={values.startDate.split("T")[0]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.startDate && touched.startDate && (
                  <div className="text-red-500 text-sm">{errors.startDate}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={values.endDate.split("T")[0]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.endDate && touched.endDate && (
                  <div className="text-red-500 text-sm">{errors.endDate}</div>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={closeEditModal}
                className="text-gray-500 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-blue-500 hover:text-blue-900"
              >
                Save
              </button>
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
                Are you sure you want to delete this field?
              </h3>
              <button
                onClick={() => handleDelete(selectedId)}
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

export default React.memo(ExperienceSection);
