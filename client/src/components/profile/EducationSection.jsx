import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Failed, Success } from "../../helper/popup";
import axios from "axios";
import { educationSchema } from "../../schemas";
import { MdPostAdd } from "react-icons/md";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { updateEducationSuccess } from "../../Redux/user/userSlice";


const EducationSection = () => {
  
  const {currentUser,currentEducation} = useSelector((state) => state.user); // Assuming currentUser is stored in the Redux store

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId,setSelectedId]=useState(null)
  const [newEdu,setNewEdu]=useState(false)
  const dispatch=useDispatch()
  const initialValues={
    courseName: "",
    collegeName: "",
    country: "",
    startDate: "",
    endDate: "",
  }

  useEffect(()=>{

    axios.get(`/api/v1/user/education/get`,{
      withCredentials:true
    })
    .then((response)=>{
      console.log('response:',response.data)
      dispatch(updateEducationSuccess(response.data))
    })
    .catch((error)=>{
      console.log('fetching education data failed',error)
    })
    
  },[])

  const openEditModal = (education) => {
    setSelectedEducation(education);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedEducation(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (edu_id) => {
    setSelectedId(edu_id)
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedId(null)
    setIsDeleteModalOpen(false);
  };
  const handleDelete = async (id) => {
    try {
      closeDeleteModal()
      const res = await axios.delete(`/api/v1/user/education/delete/${id}`, {
        withCredentials: true,
      });
      const data = res.data;
      console.log('data from delete',data)
      dispatch(updateEducationSuccess(data))
      Success(data.message);
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
    }
  };

  const { handleChange, handleBlur, values, errors, touched, handleSubmit, setValues } =
    useFormik({
      initialValues,
      validationSchema: educationSchema,
      onSubmit: async (values,action) => {

        try {
          closeEditModal();
          let res;
          if(!newEdu){
             res = await axios.patch(
              `/api/v1/user/education/edit/${selectedEducation._id}/${selectedEducation.userId}`,
              values,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );
          }else{
             res = await axios.post(
              `/api/v1/user/education/add/${currentUser.data._id}`,
              values,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );
          }
          const data = res.data;
          dispatch(updateEducationSuccess(data))
          Success(data.message);
          action.resetForm()
          
        } catch (err) {
          Failed(err.response ? err.response.data.message : err.message);
        
        }
      },
    });

useEffect(() => {
    if (selectedEducation) {
      setValues({
        courseName: selectedEducation.courseName,
        collegeName: selectedEducation.collegeName,
        country: selectedEducation.country,
        startDate: selectedEducation.startDate,
        endDate: selectedEducation.endDate,
      });
    }else{
      setValues({
        courseName: ' ',
        collegeName: ' ',
        country: ' ',
        startDate: '',
        endDate: '',
      });
    }
  }, [selectedEducation, setValues]);

  return (
    <>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4 relative ">
        <h2 className="text-2xl font-semibold mb-2">Education</h2>
       {currentEducation?.data?.length>0?
        <>
         {currentEducation.data?.map((edu, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg relative">
            <div className="grid grid-cols-2 border-[3px] p-4">
              <div className="mb-2">
                <h3 className="text-xl font-medium">Course Name</h3>
                <p className="text-gray-700">{edu.courseName}</p>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-medium">College Name</h3>
                <p className="text-gray-700">{edu.collegeName}</p>
              </div>
              <div className="mb-2" >
                <h3 className="text-xl font-medium">Country</h3>
                <p className="text-gray-700">{edu.country}</p>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-medium">Duration</h3>
                <p className="text-gray-700">
                  {edu.startDate.split('T')[0]} to {edu.endDate.split('T')[0]}
                </p>
              </div>
            </div>
            <div className="absolute top-6 right-6 flex space-x-2">
              <FiEdit
                className="h-6 w-6  hover:text-blue-500 cursor-pointer"
                onClick={() => {setNewEdu(false);openEditModal(edu)}}
              />
              <FiTrash
                className="h-6 w-6  hover:text-red-500 cursor-pointer"
                onClick={() => openDeleteModal(edu._id)}
              />
            </div>
          </div>
        )
        )}
        </>
        :
        <>
        <HiOutlineDocumentAdd
        className=" absolute top-[3%] right-[1%] h-8 w-8 hover:text-blue-500"
        onClick={() => {setNewEdu(true);openEditModal(edu)}}/>
        <MdPostAdd onClick={()=>{openEditModal();setNewEdu(true)}} className="m-auto h-9 w-9 hover:text-blue-600"  />
        </>
        
       }
       <HiOutlineDocumentAdd
        className=" absolute top-[3%] right-[1%] h-8 w-8 hover:text-blue-500"
        onClick={()=>{openEditModal();setNewEdu(true)}}/>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        className="fixed inset-0 flex items-center justify-center z-50 mt-[80px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold mb-4">{!newEdu?'Edit':'Add'} Education</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Course Name</label>
                <input
                  type="text"
                  name="courseName"
                  value={values.courseName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.courseName && touched.courseName && (
                  <div className="text-red-500 text-sm">{errors.courseName}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">College Name</label>
                <input
                  type="text"
                  name="collegeName"
                  value={values.collegeName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.collegeName && touched.collegeName && (
                  <div className="text-red-500 text-sm">{errors.collegeName}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.country && touched.country && (
                  <div className="text-red-500 text-sm">{errors.country}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={values.startDate.split('T')[0]}
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
                  value={values.endDate.split('T')[0]}
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
                onClick={()=>handleDelete(selectedId)}
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

export default React.memo(EducationSection);
