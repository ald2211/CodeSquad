import React, { useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import { IoMdClose } from "react-icons/io";
import { addProjectSchema } from "../../schemas";
import ShowError from "../ShowError";

const initialValues = {
  projectName: "",
  type: "fixed",
  fixedPrice: "",
  rph: "",
  startDate: "",
  endDate: "",
  description: "",
  attachment: null,
};

const AddProjectModal = ({ isOpen, handleClose }) => {
  const [projectType, setProjectType] = useState("fixed");
  const { errors, setFieldValue, handleSubmit, handleBlur, handleChange, touched, values } = useFormik({
    initialValues,
    validationSchema: addProjectSchema,
    onSubmit: async (values, actions) => {
      console.log('ProjectValues:', values);
      // Submit form values to server
      actions.resetForm();
    },
  });
 
 console.log('formikErrors:',errors)

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Add Project Modal"
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
      shouldCloseOnOverlayClick={true}
    >
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] mt-[78px] overflow-auto">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <IoMdClose className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Add Project</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                name="projectName"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.projectName}
                className="mt-1 p-1 block w-full border border-gray-600 rounded-md shadow-sm"
              />
              {errors.projectName && touched.projectName && <ShowError Error={errors.projectName} />}
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
              <select
                name="type"
                className="mt-1 p-1 block w-full border border-gray-600 rounded-md shadow-sm"
                onChange={(e) => {
                  setProjectType(e.target.value);
                  setFieldValue("type", e.target.value);
                }}
                onBlur={handleBlur}
                
              >
                <option value="fixed">Fixed</option>
                <option value="hourly">Hourly Pay</option>
              </select>
              
            </div>
            {projectType === "fixed" ? (
              <div className="col-span-2">
                <label htmlFor="fixedPrice" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  name="fixedPrice"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fixedPrice}
                  className="mt-1 p-1 block w-full border border-gray-600 rounded-md shadow-sm"
                />
                {errors.fixedPrice && touched.fixedPrice && <ShowError Error={errors.fixedPrice} />}
              </div>
            ) : (
              <>
                 <div className="col-span-2">
                <label htmlFor="rph" className="block text-sm font-medium text-gray-700">Rate Per Hour</label>
                <input
                  name="rph"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.rph}
                  className="mt-1 p-1 block w-full border border-gray-600 rounded-md shadow-sm"
                />
                {errors.rph && touched.rph && <ShowError Error={errors.rph} />}
              </div>
              </>
            )}
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                name="startDate"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.startDate}
                className="mt-1 block w-full border border-gray-600 p-1 rounded-md shadow-sm"
              />
              {errors.startDate && touched.startDate && <ShowError Error={errors.startDate} />}
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                name="endDate"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.endDate}
                className="mt-1 block w-full border border-gray-600 p-1 rounded-md shadow-sm"
              />
              {errors.endDate && touched.endDate && <ShowError Error={errors.endDate} />}
            </div>
            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                rows="3"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                className="mt-1 block w-full pl-1 pt-1 border border-gray-600 rounded-md shadow-sm"
              />
              {errors.description && touched.description && <ShowError Error={errors.description} />}
            </div>
            <div className="col-span-2">
              <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">Attachment</label>
              <input
                name="attachment"
                type="file"
                className="mt-1 block w-full text-gray-900"
                onChange={(event) => {
                  setFieldValue("attachment", event.currentTarget.files[0]);
                }}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Place Project
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddProjectModal;
