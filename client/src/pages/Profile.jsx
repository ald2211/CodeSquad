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
    <div className="App p-4 bg-gray-200 min-h-screen">
      <div className="flex justify-end mb-4">
        <button
         
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4  rounded-lg shadow-md"
        >
          Logout
        </button>
      </div>
      <SectionOne/>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4">
        <h2 className="text-2xl font-semibold mb-2">Resume</h2>
        <ResumeUpload />
      </div>
      <SummarySection/>
      <SkillSection/>
      <EducationSection/>
      <ExperienceSection/>
      <ProjectsSection/>

    </div>
  )
}

export default Profile
