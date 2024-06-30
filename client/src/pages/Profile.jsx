import React from 'react'
import Navbar from '../components/Navbar'
import SectionOne from '../components/profile/SectionOne'
import SummarySection from '../components/profile/SummarySection'
import SkillSection from '../components/profile/SkillSection'
import EducationSection from '../components/profile/EducationSection'
import ExperienceSection from '../components/profile/ExperienceSection'
import ProjectsSection from '../components/profile/ProjectSection'
import ResumeUpload from '../components/profile/AddResume'
import { Failed } from '../helper/popup'
import { processFailed, processStart, signoutSuccess } from '../Redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import spinner from '../assets/loader.gif'

const Profile = () => {

  const dispatch=useDispatch()
  const {loading}=useSelector((state)=>state.user)
  const handleSignOut=async(req,res)=>{

    try{
      dispatch(processStart())
      const res=await axios.get('/api/v1/auth/signout')
      if(!res.data.success){
        dispatch(processFailed())
        Failed('some error occured')
        return
      }
      dispatch(signoutSuccess())

    }catch(err){
      console.log('signout err:',err)
      dispatch(processFailed())
      Failed('signout failed')
    }
  }
  return (
      <>
      {
        !loading?
        <div className=" p-4 bg-gray-200 min-h-screen">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSignOut}
            className=" mt-[90px] z-[1] bg-red-500 hover:bg-red-600 text-white py-2 px-4  rounded-lg shadow-md"
          >
            Logout
          </button>
        </div>
        <SectionOne/>
        <ResumeUpload />
        <SummarySection/>
        <SkillSection/>
        <EducationSection/>
        <ExperienceSection/>
        <ProjectsSection/>
  
      </div>
        
        :
          <div className="w-full h-screen flex items-center justify-center">
            <img className="w-[60px]" src={spinner} alt="spinner" />
          </div>
      }
      </>
  )
}

export default Profile
