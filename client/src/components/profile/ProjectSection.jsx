import React from 'react';

const ProjectsSection = () => {
  const projectsData = [
    {
      projectName: 'E-commerce Website',
      summary: 'Developed a full-stack e-commerce platform using MERN stack (MongoDB, Express.js, React, Node.js). Integrated with payment gateways and implemented product search functionality.',
    },
    {
      projectName: 'Task Management App',
      summary: 'Built a task management application with features for task assignment, status tracking, and priority management. Utilized React for the front-end and Node.js with MongoDB for the backend.',
    },
  ];

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-semibold mb-2">Projects</h2>
      {projectsData.map((project, index) => (
        <div key={index} className=" border-[3px] mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-medium">Project Name</h3>
              <p className="text-gray-700">{project.projectName}</p>
            </div>
            <div className="col-span-2">
              <h3 className="text-xl font-medium">Summary</h3>
              <p className="text-gray-700">{project.summary}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsSection;
