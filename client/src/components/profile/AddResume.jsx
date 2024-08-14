import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSuccess } from "../../Redux/user/userSlice";
import { ThreeDots } from "react-loader-spinner";
import { Failed, Success } from "../../helper/popup";
import { app } from "../../firebase/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { uploadResume } from "../../api/service";

const ResumeUpload = () => {
  const [loadingEffect, setLoadingEffect] = useState(false);
  const [resume, setResume] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Function to upload resume file to Firebase Storage

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoadingEffect(true);
        const storage = getStorage(app);
        const fileName = `${new Date().getTime()}_${file.name}`;
        const storageRef = ref(storage, `resumes/${fileName}`);
        const snapShot = await uploadBytes(storageRef, file);
        const resumeUrl = await getDownloadURL(snapShot.ref);
        const res = await uploadResume(
          currentUser.data._id,
          resumeUrl + "___" + file.name
        );
        const data = res.data;
        dispatch(updateUserSuccess(data));
        Success("Resume updated successfully");
      } catch (err) {
        console.error("Error updating resume:", err);
        Failed("Upload failed");
      } finally {
        setLoadingEffect(false);
      }
    }
  };

  const handleReplace = () => {
    setResume(null);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-semibold mb-2">Resume</h2>
      {!loadingEffect ? (
        <div className="flex items-center">
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="resume"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 ml-0 text-white py-2 px-4 rounded-lg"
          >
            {`${currentUser?.data?.resume ? "Update" : "Upload"} Resume`}
          </label>
          {currentUser?.data?.resume && (
            <span className="ml-4">
              {currentUser.data.resume.split("___")[1]}
            </span>
          )}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#3333ff"
            ariaLabel="three-dots-loading"
          />
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
