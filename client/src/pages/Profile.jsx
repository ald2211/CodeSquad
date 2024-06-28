import React from 'react'
import Navbar from '../components/Navbar'
import SectionOne from '../components/profile/SectionOne'
import SummarySection from '../components/profile/SummarySection'
import SkillSection from '../components/profile/SkillSection'
import EducationSection from '../components/profile/EducationSection'
import ExperienceSection from '../components/profile/ExperienceSection'
import ProjectsSection from '../components/profile/ProjectSection'
import ResumeUpload from '../components/profile/AddResume'


const Profile = () => {
  return (
    <div className=" p-4 bg-gray-200 min-h-screen">
      <div className="flex justify-end mb-4">
        <button
         
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4  rounded-lg shadow-md"
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
  )
}

export default Profile
