import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Failed, Success } from "../../helper/popup";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase/firebase";
import axios from "axios";
import {
  processStart,
  updateUserSuccess,
  processFailed,
} from "../../Redux/user/userSlice";
import spinner from "../../assets/loader.gif";
import { uploadImage } from "../../api/service";

const AdminProfile = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const dispatch = useDispatch();

  const [filePerc, setFilePerc] = useState(0);
  const [updateImage, setUpdateImage] = useState(null);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    dispatch(processStart());
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
        console.log('imageUrl:', imageUrl);
        try {
          const res = await uploadImage(currentUser.data._id, imageUrl);
          const data = res.data;
          console.log(data);
          console.log("serverImg:", data.message);
          dispatch(updateUserSuccess(data));
          Success("profile image updated Successfully");
        } catch (err) {
          console.log("serverImgErr:", err);
          dispatch(processFailed());
        }
      }
    );
  };

  return (
    <section className="relative flex flex-col items-center md:flex-row md:items-start p-4 bg-gray-100 rounded-lg shadow-md w-full">
      {!loading ? (
        <div className="flex flex-col md:flex-row items-center md:items-start w-full">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            className="hidden"
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            className="object-cover w-32 h-32 rounded-full cursor-pointer"
            src={currentUser?.data?.avatar}
            alt="Profile"
          />
          <div className="mt-4 md:mt-0 md:ml-6">
            <p className="text-xl md:text-2xl lg:text-4xl font-semibold text-black">
              {currentUser?.data?.name}
              <span className="block font-normal text-lg md:text-xl lg:text-2xl text-gray-600">
                {currentUser?.data?.email}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full h-[60px] bg-white flex items-center justify-center">
          <img className="w-[60px]" src={spinner} alt="Loading" />
        </div>
      )}
    </section>
  );
};

export default AdminProfile;
