import React, { useState } from "react";
import Modal from "react-modal";
import { FiEdit } from "react-icons/fi";
import { useFormik } from "formik";
import { summarySchema } from "../../schemas";
import ShowError from "../ShowError";
import { useDispatch, useSelector } from "react-redux";
import { Failed, Success } from "../../helper/popup";
import axios from "axios";
import { MdPostAdd } from "react-icons/md";
import {
  updateUserSuccess
} from "../../Redux/user/userSlice";
import spinner from "../../assets/loader.gif";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { uploadSummary } from "../../api/service";


const SummarySection = () => {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {currentUser}=useSelector((state)=>state.user)
  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch()
  const { handleChange, handleBlur, values, errors, handleSubmit, touched } =
    useFormik({
      initialValues:{summary:currentUser?.data?.summary||''},
      validationSchema: summarySchema,
      onSubmit: async (values, action) => {
        try {
          closeEditModal();
          setLoading(true)
          const res = await uploadSummary(currentUser?.data?._id,values)
          const data = res.data;
          console.log(data);
          
          dispatch(updateUserSuccess(data))
          setLoading(false)
          Success('summary updated successfully');
        } catch (err) {
          setLoading(false)
          console.log(err)
        }
      },
    });
    // Open modal function
    const openEditModal = () => {
      setIsEditModalOpen(true);
    };
  
    const closeEditModal = () => {
      setIsEditModalOpen(false);
    };
  return (
    <section className=" relative p-6 bg-gray-100 rounded-lg shadow-md mt-4">
    <h2 className="text-2xl font-semibold mb-2">Summary</h2>
    {!loading?
      <>
       <p className="text-gray-700">
       {currentUser.data.summary?currentUser.data.summary
       
       :
       <MdPostAdd onClick={openEditModal} className="m-auto h-9 w-9 hover:text-blue-600"  />
       
       }
    </p>
   { !currentUser.data.summary?<HiOutlineDocumentAdd
        className=" absolute top-[3%] right-[1%] h-8 w-8 hover:text-blue-500"
        onClick={openEditModal}
   />
    :
    <FiEdit
              className=" absolute top-[3%] right-[1%] h-6 w-6 hover:text-blue-500"
              onClick={openEditModal}
            />}
        {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold mb-4">{currentUser.data.summary?'Edit Details':'Add Details'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <textarea
                value={values.summary}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="6"
                name='summary'
                className="w-full pl-1 pt-1"
                placeholder="Enter summary..."
              />
              {errors.summary && touched.summary ? (
                <ShowError Error={errors.summary} />
              ) : null}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={closeEditModal}
                className="text-gray-500  hover:text-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-blue-500 hover:text-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
      </>
      :
       
        <>
          <div className="w-full h-full flex items-center justify-center">
            <img className="w-[60px]" src={spinner} alt="spinner" />
          </div>
        </>
      
      }
    </section>
  )
}

export default SummarySection
