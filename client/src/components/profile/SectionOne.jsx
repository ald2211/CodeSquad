import React, { useRef, useState, useEffect } from "react";
import Modal from "react-modal";
import { FiEdit } from "react-icons/fi";
import { useFormik } from "formik";
import { firstSectionSchema } from "../../schemas";
import ShowError from "../ShowError";
import { useDispatch, useSelector } from "react-redux";
import { Failed, Success } from "../../helper/popup";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase/firebase";
import {
  processStart,
  updateUserSuccess,
  processFailed,
} from "../../Redux/user/userSlice";
import spinner from "../../assets/loader.gif";
import StarRating from "./StarRating";
import { updateUser, uploadImage } from "../../api/service";
import { ThreeDots } from "react-loader-spinner";

const DeveloperProfile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { currentUser, loading } = useSelector((state) => state.user);
  const [dataLoading, setDataLoading] = useState(false);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const dispatch = useDispatch();

  const initialValues = {
    userRole: currentUser?.data?.jobRole || "your role",
    rph: currentUser?.data?.rph || 0,
  };

  const { handleChange, handleBlur, values, errors, handleSubmit, touched } =
    useFormik({
      initialValues,
      validationSchema: firstSectionSchema,
      onSubmit: async (values, action) => {
        try {
          closeEditModal();
          setDataLoading(true);
          const res = await updateUser(currentUser.data._id, values);
          const data = res.data;
          console.log(data);

          dispatch(updateUserSuccess(data));
          Success(data.message);
        } catch (err) {
          Failed(err.response ? err.response.data.message : err.message);
        } finally {
          setDataLoading(false);
        }
      },
    });
  const [role, setRole] = useState("Mark Tanker");
  const [hourlyPay, setHourlyPay] = useState("₹5000/hr");

  // imageupload
  const [filePerc, setFilePerc] = useState(0);
  const [updateImage, setUpdateImage] = useState(null);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    setDataLoading(true)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "_" + file.name;
    const storageRef = ref(storage, `avatar/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",

      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setFilePerc(Math.round(progress));
      },
      (error) => {
        dispatch(processFailed());
        Failed("image upload failed");
      },
      async () => {
        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setFile(null);
        setUpdateImage(imageUrl);

        try {
          const res = await uploadImage(currentUser.data._id, imageUrl);
          const data = res.data;
          console.log(data);

          dispatch(updateUserSuccess(data));
          Success("profile image updated Successfully");
        } catch (err) {
          err
        }finally{
          setDataLoading(false)
        }
      }
    );
  };

  //image upload ends
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <section className="relative  flex flex-col md:flex-row items-center p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Left div */}
      {!dataLoading ? (
        <>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center flex">
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                ref={fileRef}
                className="hidden"
                accept="image/*"
              />
              <img
                onClick={() => fileRef.current.click()}
                className=" lg:self-start object-cover w-32 h-32  rounded-full"
                src={currentUser?.data?.avatar}
                alt="image"
              />
              <p className=" text-xl md:text-2xl flex flex-col mt-6 ml-3 lg:text-4xl font-semibold text-black">
                {currentUser?.data?.name}
                <span className="font-normal text-lg md:text-xl  text-left lg:text-2xl text-gray-600">
                  {currentUser?.data?.jobRole}
                </span>
              </p>
            </div>
          </div>

          {/* Right div */}
          <div className="flex flex-col lg:items-center lg:mr-0 md:mr-0 m-auto  md:items-end md:w-1/2 p-4">
            <StarRating rating={currentUser?.data?.averageRating} />
          </div>
          <div className="flex space-x-2 ml-auto md:mb-auto lg:mb-auto">
            <FiEdit
              className="absolute top-[3%] right-[1%] h-6 w-6 hover:text-blue-500"
              onClick={openEditModal}
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
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="role"
                  >
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
                <div className="flex justify-end space-x-2">
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
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          {/* <img className="w-[60px]" src={spinner} alt="spinner" /> */}

          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#3333ff"
            ariaLabel="three-dots-loading"
          />
        </div>
      )}
    </section>
  );
};

export default DeveloperProfile;
