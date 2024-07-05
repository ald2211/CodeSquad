import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Failed, Success } from "../../helper/popup";
import axios from "axios";
import { projectSchema } from "../../schemas";
import { MdPostAdd } from "react-icons/md";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { updateProjectSuccess } from "../../Redux/user/userSlice";
import { addProjects, deleteProjects, editProjects, getProjects } from "../../api/service";

Modal.setAppElement('#root');

const ProjectsSection = () => {
  const { currentUser, currentProjects } = useSelector((state) => state.user);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [newProj, setNewProj] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    projectName: "",
    projectSummary: "",
  };

  useEffect(() => {
    getProjects().then((response)=>{
      dispatch(updateProjectSuccess(response.data));
    }).catch((err)=>console.log(err))
  }, []);

  const openEditModal = (project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedProject(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (proj_id) => {
    setSelectedId(proj_id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedId(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      closeDeleteModal();
      const res = await deleteProjects(id)
      const data = res.data;
      console.log("data from delete", data);
      dispatch(updateProjectSuccess(data));
      Success(data.message);
    } catch (err) {
      console.log(err)
    }
  };

  const { handleChange, handleBlur, values, errors, touched, handleSubmit, setValues } = useFormik({
    initialValues,
    validationSchema: projectSchema,
    onSubmit: async (values, action) => {
      try {
        closeEditModal();
        let res;
        if (!newProj) {
          res = await editProjects(selectedProject._id,selectedProject.userId,values)
        } else {
          res = await addProjects(currentUser.data._id,values)
        }
        const data = res.data;
        dispatch(updateProjectSuccess(data));
        Success(data.message);
        action.resetForm();
      } catch (err) {
        console.log(err)
      }
    },
  });

  useEffect(() => {
    if (selectedProject) {
      setValues({
        projectName: selectedProject.projectName,
        projectSummary: selectedProject.projectSummary,
      });
    }else{
      setValues({
        projectName:' ',
        projectSummary:' '
      })
    }
  }, [selectedProject, setValues]);

  return (
    <>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4 relative">
        <h2 className="text-2xl font-semibold mb-2">Projects</h2>
        {currentProjects?.data?.length > 0 ? (
          <>
            {currentProjects?.data?.map((proj, index) => (
              <div key={index} className="border-[3px] mb-4 p-4 bg-gray-50 rounded-lg relative">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xl font-medium">Project Name</h3>
                    <p className="text-gray-700">{proj.projectName}</p>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-xl font-medium">Summary</h3>
                    <p className="text-gray-700">{proj.projectSummary}</p>
                  </div>
                </div>
                <div className="absolute top-6 right-6 flex space-x-2">
                  <FiEdit
                    className="h-6 w-6  hover:text-blue-500 cursor-pointer"
                    onClick={() => { setNewProj(false); openEditModal(proj) }}
                  />
                  <FiTrash
                    className="h-6 w-6  hover:text-red-500 cursor-pointer"
                    onClick={() => openDeleteModal(proj._id)}
                  />
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
           
            <MdPostAdd onClick={() => { openEditModal(); setNewProj(true) }} className="m-auto h-9 w-9 hover:text-blue-600 cursor-pointer" />
          </>
        )}
         <HiOutlineDocumentAdd
              className="absolute top-[3%] right-[1%] h-8 w-8 hover:text-blue-500 cursor-pointer"
              onClick={() => { setNewProj(true); openEditModal() }} />
      </div>
      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        className="fixed inset-0 flex items-center justify-center z-50 mt-[80px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold mb-4">{!newProj ? 'Edit' : 'Add'} Project</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block mb-2">Project Name</label>
                <input
                  type="text"
                  name="projectName"
                  value={values.projectName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border rounded"
                />
                {errors.projectName && touched.projectName && (
                  <div className="text-red-500 text-sm">{errors.projectName}</div>
                )}
              </div>
              <div className="col-span-2 mb-4">
                <textarea
                  value={values.projectSummary}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="6"
                  name='projectSummary'
                  className="w-full pl-1 pt-1 border rounded"
                  placeholder="About your project..."
                />
                {errors.projectSummary && touched.projectSummary && (
                  <div className="text-red-500 text-sm">{errors.projectSummary}</div>
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
      {/* Delete Modal */}
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this project?
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

export default React.memo(ProjectsSection);
