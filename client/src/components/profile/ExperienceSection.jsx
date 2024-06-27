import React from 'react';

const ExperienceSection = () => {
  const experienceData = [
    {
      jobTitle: 'Senior Software Engineer',
      companyName: 'Tech Solutions Inc.',
      location: 'New York, USA',
      startDate: 'July 2018',
      endDate: 'Present',
      description: 'Lead a team of developers in creating scalable web applications using React, Node.js, and GraphQL.',
    },
    {
      jobTitle: 'Software Developer',
      companyName: 'Web Development Co.',
      location: 'San Francisco, USA',
      startDate: 'January 2015',
      endDate: 'June 2018',
      description: 'Developed front-end applications and integrated with RESTful APIs. Collaborated with designers and back-end developers.',
    },
  ];

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-semibold mb-2">Experience</h2>
      {experienceData.map((exp, index) => (
        <div key={index} className=" border-[3px] mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-medium">Job Title</h3>
              <p className="text-gray-700">{exp.jobTitle}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Company Name</h3>
              <p className="text-gray-700">{exp.companyName}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Location</h3>
              <p className="text-gray-700">{exp.location}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Duration</h3>
              <p className="text-gray-700">
                {exp.startDate} - {exp.endDate}
              </p>
            </div>
            <div className="col-span-2">
              <h3 className="text-xl font-medium">Description</h3>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceSection;
