import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import { IoMdClose } from "react-icons/io";
import { addProjectSchema } from "../../schemas";
import ShowError from "../ShowError";
import { useDispatch } from "react-redux";
import { processFailed, processStart, updateWorkSuccess } from "../../Redux/user/userSlice";
import { Failed, Success } from "../../helper/popup";
import { addWork, updateClientWork } from "../../api/service";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase/firebase";

const initialAddValues = {
  projectName: "",
  type: "fixed",
  budget: "",
  endDate: "",
  description: "",
  expectedDelivery:"",
  requiredSkills: [],
  attachment: null,
};

const AddProjectModal = ({ isOpen, handleClose, isAddMode, selectedWork }) => {
  const [newSkill, setNewSkill] = useState('');
  const dispatch = useDispatch();

  const initialValuesForEdit = selectedWork ? {
    projectName: selectedWork.workName,
    type: selectedWork.workType,
    budget: selectedWork.budget,
    endDate: selectedWork.bidEndDate.split('T')[0],
    description: selectedWork.description,
    expectedDelivery: selectedWork.expectedDelivery,
    requiredSkills: selectedWork.requiredSkills || [],
    attachment: selectedWork.attachMents,
  } : initialAddValues;

  const formik = useFormik({
    initialValues: isAddMode ? initialAddValues : initialValuesForEdit,
    validationSchema: addProjectSchema,
    onSubmit: async (values, actions) => {
      try {
        dispatch(processStart());
        if (values.attachment && !selectedWork?.attachMents) {
          const storage = getStorage(app); 
          const fileName = `${new Date().getTime()}_${values.attachment.name}`; 
          const storageRef = ref(storage, `attachments/${fileName}`); 

          const snapshot = await uploadBytes(storageRef, values.attachment);
          const attachmentUrl = await getDownloadURL(snapshot.ref); 

          values.attachment = `${attachmentUrl}___${values.attachment.name}`;
        }
        if (isAddMode) {
          const res = await addWork(values);
          dispatch(updateWorkSuccess(res.data.data));
          Success(res.data.message);
        } else {
          const res = await updateClientWork(values, selectedWork.workNumber);
          dispatch(updateWorkSuccess(res.data.data));
          Success(res.data.message);
        }
        actions.resetForm();
        handleClose();
      } catch (err) {
        dispatch(processFailed());
        console.log('errAtAddOrUpdateWork:', err);
        Failed("An error occurred while processing your request.");
      }
    },
  });

  useEffect(() => {
    formik.setValues(isAddMode ? initialAddValues : initialValuesForEdit);
  }, [isAddMode, selectedWork]);

  const handleAddSkill = () => {
    if (newSkill && !formik.values.requiredSkills.includes(newSkill)) {
      formik.setFieldValue('requiredSkills', [...formik.values.requiredSkills, newSkill]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill) => {
    formik.setFieldValue("requiredSkills", formik.values.requiredSkills.filter(s => s !== skill));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Add Project Modal"
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center scroll-m-1"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] mt-[78px] overflow-auto  scrollbar-thumb-gray-500 scrollbar-medium scrollbar-thin scrollbar-track-gray-100">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <IoMdClose className="h-6 w-6" />
        </button>
        <h2 id="add-project-title" className="text-2xl font-semibold mb-4">
          {isAddMode ? "Add Project" : "Edit Project"}
        </h2>

        <form onSubmit={formik.handleSubmit} aria-labelledby="add-project-title">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                id="projectName"
                name="projectName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.projectName}
                className="mt-1 p-1 block w-full border border-gray-600 rounded-md shadow-sm"
              />
              {formik.errors.projectName && formik.touched.projectName && <ShowError Error={formik.errors.projectName} />}
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                id="type"
                name="type"
                className="mt-1 p-1 block w-full border border-gray-600 rounded-md shadow-sm"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.type}
              >
                <option value="fixed">Fixed</option>
                <option value="hourly">Hourly Pay</option>
              </select>
            </div>
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                id="budget"
                name="budget"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.budget}
                className="mt-1 p-1 block w-full border border-gray-600 rounded-md shadow-sm"
              />
              {formik.errors.budget && formik.touched.budget && <ShowError Error={formik.errors.budget} />}
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endDate}
                className="mt-1 block w-full border border-gray-600 p-1 rounded-md shadow-sm"
              />
              {formik.errors.endDate && formik.touched.endDate && <ShowError Error={formik.errors.endDate} />}
            </div>
            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                className="mt-1 block w-full pl-1 pt-1 border border-gray-600 rounded-md shadow-sm"
              />
              {formik.errors.description && formik.touched.description && <ShowError Error={formik.errors.description} />}
            </div>
            <div>
              <label htmlFor="expectedDelivery" className="block text-sm font-medium text-gray-700">
                Expected Delivery (days)
              </label>
              <input
                id="expectedDelivery"
                name="expectedDelivery"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.expectedDelivery}
                className="mt-1 block w-full border border-gray-600 p-1 rounded-md shadow-sm"
              />
              {formik.errors.expectedDelivery && formik.touched.expectedDelivery && <ShowError Error={formik.errors.expectedDelivery} />}
            </div>
            <div className="col-span-2">
              <label htmlFor="requiredSkills" className="block text-sm font-medium text-gray-700">
                Required Skills
              </label>
              <div className="mt-1 flex flex-wrap items-center border border-gray-600 rounded-md p-2">
                {formik.values.requiredSkills.map((skill, index) => (
                  <div key={index} className="flex items-center bg-gray-200 rounded-lg px-3 py-2 mr-2 mb-2">
                    <span className="text-gray-700">{skill}</span>
                    <button
                      type="button"
                      className="ml-2 text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      x
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Add a skill"
                  className="flex-1 p-1"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                 <button
      type="button"
      className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
      onClick={handleAddSkill}
    >
      Add
    </button>
              </div>
              {formik.errors.requiredSkills && formik.touched.requiredSkills && <ShowError Error={formik.errors.requiredSkills} />}
            </div>
            <div className="col-span-2">
              <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">
                Attachment
              </label>
              {formik.values.attachment ? (
                <div className="mt-2 flex items-center">
                  <span className="text-gray-700">{typeof formik.values.attachment === "string" ? formik.values.attachment.split("___")[1] : formik.values.attachment.name}</span>
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => formik.setFieldValue("attachment", null)}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <input
                  id="attachment"
                  name="attachment"
                  type="file"
                  className="mt-1 p-1 block w-full border border-gray-600 rounded-md shadow-sm"
                  onChange={(event) => formik.setFieldValue("attachment", event.target.files[0])}
                />
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isAddMode ? "Add Project" : "Update Project"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddProjectModal;
