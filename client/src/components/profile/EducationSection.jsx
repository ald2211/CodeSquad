import React from 'react';

const EducationSection = () => {
  const educationData = [
    {
      courseName: 'Bachelor of Science in Computer Science',
      collegeName: 'XYZ University',
      country: 'USA',
      startDate: 'August 2015',
      endDate: 'May 2019',
    },
    {
      courseName: 'Master of Science in Software Engineering',
      collegeName: 'ABC Institute of Technology',
      country: 'Canada',
      startDate: 'September 2019',
      endDate: 'June 2021',
    },
  ];

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-semibold mb-2">Education</h2>
      {educationData.map((edu, index) => (
        <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 border-[3px] p-4">
            <div>
              <h3 className="text-xl font-medium">Course Name</h3>
              <p className="text-gray-700">{edu.courseName}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">College Name</h3>
              <p className="text-gray-700">{edu.collegeName}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Country</h3>
              <p className="text-gray-700">{edu.country}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Duration</h3>
              <p className="text-gray-700">
                {edu.startDate} - {edu.endDate}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationSection;
