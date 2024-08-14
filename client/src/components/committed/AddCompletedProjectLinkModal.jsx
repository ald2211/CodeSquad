import React from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import { IoMdClose } from "react-icons/io";
import ShowError from "../ShowError";
import { Failed, Success } from "../../helper/popup";
import { uploadProjectFile } from "../../api/service"; // Adjust API service
import { projectLinkSchema } from "../../schemas";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase/firebase";

const initialValues = {
  projectLink: null,
};

const AddCompletedProjectLinkModal = ({
  isOpen,
  handleClose,
  work,
  committed,
  setCommitted,
  setUploading,
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema: projectLinkSchema,
    onSubmit: async (values, actions) => {
      try {
        setUploading(true);
        handleClose();

        const file = values.projectLink;
        if (!file) {
          throw new Error("No file selected");
        }

        const storage = getStorage(app);
        const folderPath = `finalLinkFolder/${work.workNumber}`;
        const fileName = `${new Date().getTime()}_${file.name}`;
        const storageRef = ref(storage, `${folderPath}/${fileName}`);

        await uploadBytes(storageRef, file);

        const fileUrl = await getDownloadURL(storageRef);

        const res = await uploadProjectFile(work.workNumber, fileUrl);

        if (res.data.success) {
          const updatedWorkData = [...committed];
          updatedWorkData[work.key].projectLink = fileUrl;
          setCommitted(updatedWorkData);
          Success("Project link updated successfully");
        }
      } catch (err) {
        Failed("Failed to update project link");
      } finally {
        actions.resetForm();
        setUploading(false);
      }
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Add Project Link Modal"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] mt-[78px] overflow-auto">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <IoMdClose className="h-6 w-6" />
        </button>
        <h2
          id="add-project-link-title"
          className="text-2xl font-semibold mb-6 text-center text-gray-800"
        >
          Add Project Link
        </h2>

        <form
          onSubmit={formik.handleSubmit}
          aria-labelledby="add-project-link-title"
        >
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div>
              <label
                htmlFor="projectLink"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Upload ZIP File
              </label>
              <input
                id="projectLink"
                name="projectLink"
                type="file"
                accept=".zip"
                onChange={(event) =>
                  formik.setFieldValue(
                    "projectLink",
                    event.currentTarget.files[0]
                  )
                }
                onBlur={formik.handleBlur}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.errors.projectLink && formik.touched.projectLink && (
                <ShowError Error={formik.errors.projectLink} />
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddCompletedProjectLinkModal;
