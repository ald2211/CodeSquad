import React from 'react'
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
import spinner from '../assets/loader.gif'
import { userLogout } from '../api/service'
import Sidebar from '../components/AdminSidebar'
import AdminProfile from '../components/profile/AdminProfile'
import ShowReviews from '../components/profile/ShowReviews'

const Profile = () => {

  const dispatch=useDispatch()
  const {currentUser,loading}=useSelector((state)=>state.user)
  const handleSignOut=async(req,res)=>{

    try{
      dispatch(processStart())
      const res=await userLogout()
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
        <>
        {
          currentUser.data.role!=='admin'?
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
        {
          currentUser.data.role==='developer'&& <ResumeUpload />
        }
       
        <SummarySection/>
        {
          currentUser.data.role==='developer'&&
        <>
        <SkillSection/>
        <EducationSection/>
        <ExperienceSection/>
        <ProjectsSection/>
        </>
        }
        <ShowReviews/>
      </div>
      :
      <div className=" w-full mt-[82px] flex">
      <div className='w-15p lg:w-22p'>
        <Sidebar />
      </div>
      <div className="w-3/4 p-4">
        <AdminProfile />
      </div>
    </div>
        }
        </>
        
        :
          <div className="w-full h-[60px] flex items-center justify-center">
            <img className="w-[60px]" src={spinner} alt="spinner" />
          </div>
      }
      </>
  )
}

export default Profile
