import React, { useState } from 'react'

const SkillSection = () => {
    const skills = [
        'JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'Git', 'GitHub', 
        'Agile Methodologies', 'TypeScript', 'Redux', 'GraphQL', 'Express.js','abcd','efg'
      ];
  return (
    <>
    <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-semibold mb-2">Skills</h2>
      <div className="flex flex-wrap space-x-2 space-y-2">
        {skills.map((skill, index) => (
          <span key={index} className="bg-gray-200 px-3 py-1 rounded-md text-gray-700">
            {skill.toUpperCase()}
          </span>
        ))}
      </div>
     
    </div>
    </>
  )
}

export default SkillSection
