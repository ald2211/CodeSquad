import React, { useState } from 'react';
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux';
import { processStart,processFailed,updateUserSuccess } from '../../Redux/user/userSlice';
import spinner from "../../assets/loader.gif";
import { Failed, Success } from '../../helper/popup';
const ResumeUpload = () => {
  const [resume, setResume] = useState(null);
  const {currentUser}=useSelector((state)=>state.user)
  const [loadingEffect,setLoadingEffect]=useState(false)
  const dispatch=useDispatch()

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      try{

        setLoadingEffect(true)
        const formData = new FormData();
        formData.append('resume', file);
      const res=await axios.patch(`/api/v1/user/upload/${currentUser.data._id}`,formData,{

        headers:{
          'Content-Type': 'multipart/form-data'
        },
        withCredentials:true
      })
      const data=res.data
      dispatch(updateUserSuccess(data))
      setLoadingEffect(false)
      Success('resume updated successfully')

      }catch(err){
        console.log('fileErrror:',err)
        setLoadingEffect(false)
        Failed('upload failed')
        
      }

    }
  };

  const handleReplace = () => {
    setResume(null);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4">
        <h2 className="text-2xl font-semibold mb-2">Resume</h2>
      {
        !loadingEffect?
        <div className="flex items-center ">
          <input
            type="file"
            id="resume"
            name='resume'
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden "
          />
          <label
            htmlFor="resume"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 ml-0 text-white  py-2 px-4   rounded-lg"
          >
            {`${currentUser?.data?.resume?'update':'upload '}Resume`} 
          </label>
          {currentUser?.data?.resume && (
            <span className="ml-4">{ currentUser.data.resume.split('--')[1]}</span>
          )}
    </div>
    :
    <div className="w-full h-full flex items-center justify-center">
      <img className="w-[60px]" src={spinner} alt="spinner" />
    </div>
      }
      </div>
    
  );
};

export default ResumeUpload;
