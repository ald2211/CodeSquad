import React, { useState } from "react";
import Modal from "react-modal";
import { FiEdit } from "react-icons/fi";
import { useFormik } from "formik";
import { skillsSchema } from "../../schemas";
import { useDispatch, useSelector } from "react-redux";
import { Failed, Success } from "../../helper/popup";
import axios from "axios";
import { updateUserSuccess } from "../../Redux/user/userSlice";
import { MdPostAdd } from "react-icons/md";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { uploadSkills } from "../../api/service";



const SkillsSection = () => {
  const dispatch = useDispatch(); 
  const {currentUser} = useSelector((state) => state.user); 

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const skills = currentUser?.data?.skills; 

  const { handleChange, handleBlur, values, errors, touched, handleSubmit } =
    useFormik({
      initialValues: { skills:currentUser?.data?.skills.join(", ") },
      validationSchema: skillsSchema,
      onSubmit: async (values, { resetForm }) => {
        try {
          closeEditModal();
          const updatedSkills =values.skills===''?[]:values.skills.split(",").map(skill => skill.trim());
          console.log('updatedSkills:',updatedSkills)
          const res =await uploadSkills(currentUser.data._id,updatedSkills)
          const data = res.data;
          console.log(data);

          dispatch(updateUserSuccess(data));
          Success(data.message);
        } catch (err) {
         
         console.log('err',err)
        }
      },
    });

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4 relative">
        <h2 className="text-2xl font-semibold mb-2">Skills</h2>
        {
          skills&&skills.length>0?
          <div className="flex flex-wrap space-x-2 space-y-2">
          {skills.map((skill, index) => (
            <span key={index} className="bg-gray-200 px-3 py-1 rounded-md text-gray-700">
              {skill.toUpperCase()}
            </span>
          ))}
        </div>
        :
        <MdPostAdd onClick={openEditModal} className="m-auto h-9 w-9 hover:text-blue-600"  />
        }
         { skills&&skills.length===0?<HiOutlineDocumentAdd
        className=" absolute top-[3%] right-[1%] h-8 w-8 hover:text-blue-500"
        onClick={openEditModal}
   />
    :
    <FiEdit
              className=" absolute top-[3%] right-[1%] h-6 w-6 hover:text-blue-500"
              onClick={openEditModal}
            />}
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold mb-4">{skills&&skills.length>0?'Edit Skills':'Add Skills'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <textarea
                value={values.skills}
                onChange={handleChange}
                onBlur={handleBlur}
                name="skills"
                rows="6"
                className="w-full pl-1 pt-1"
                placeholder="Enter skills separated by commas..."
              />
              {errors.skills && touched.skills ? (
                <div className="text-red-500 text-sm mt-1">{errors.skills}</div>
              ) : null}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={closeEditModal}
                className="text-gray-500 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-blue-500 hover:text-blue-800"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default SkillsSection;
