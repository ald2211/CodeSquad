import React, { useState } from 'react';

const ResumeUpload = () => {
  const [resume, setResume] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      // Here you can add logic to upload the file to a server
      // Example: uploadResume(file);
    }
  };

  const handleRemove = () => {
    setResume(null);
  };

  return (
    <div className="flex items-center ">
      {resume ? (
        <>
          <span className="text-gray-600">{resume.name}</span>
          <button
            onClick={handleRemove}
            className="text-red-600 hover:text-red-700 ml-3 focus:outline-none"
          >
            Remove
          </button>
        </>
      ) : (
        <>
          <input
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden "
          />
          <label
            htmlFor="resume"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 ml-0 text-white  py-2 px-4   rounded-lg"
          >
            Upload Resume
          </label>
        </>
      )}
    </div>
  );
};

export default ResumeUpload;
