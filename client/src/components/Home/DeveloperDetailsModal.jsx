import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import spinner from '../../assets/loader.gif';
import { getDeveloperDetails } from "../../api/service";
import { ImFileEmpty } from "react-icons/im";
import { FaStar } from "react-icons/fa";
const DeveloperDetailsModal = ({ developer, isOpen, onClose }) => {
  const [developerDetails, setDeveloperDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <div className="flex">
        {Array.from({ length: totalStars }, (_, index) => (
          <FaStar
            key={index}
            className={index < rating ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    const fetchDeveloperDetails = async () => {
      setLoading(true);
      try {
        if (developer) { 
          const res = await getDeveloperDetails(developer);
          setDeveloperDetails(res.data.data);
          console.log('dataaaa:',res.data.data)
        } 
      } catch (error) {
        console.error("Failed to fetch developer details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeveloperDetails();
  }, [developer]);

  if (!developer) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Developer Details"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
      shouldCloseOnOverlayClick={true}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-screen-lg max-h-[80vh] mt-16 overflow-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800">Developer Details</h2>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <img src={spinner} alt="Loading" className="w-16 h-16 animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex space-x-6">
              <div className="w-32 flex-shrink-0">
                <img
                  src={developerDetails?.developerData?.avatar}
                  alt="Developer"
                  className="w-32 h-32 object-cover rounded-full shadow-md"
                />
              </div>
              <div className="w-1/2">
                <h3 className="text-2xl font-semibold text-gray-900">{developerDetails?.developerData?.name}</h3>
                <p className="text-gray-600 mt-2">{developerDetails?.developerData?.jobRole}</p>
                <p className="text-gray-600 mt-2">{developerDetails?.developerData?.summary}</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Projects</h3>
              <div className="space-y-4">
                {(developerDetails?.developerProjects?.length>0)?
                developerDetails.developerProjects?.map((project, index) => (
                  <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <p className="text-gray-700 font-semibold">{project.projectName.toUpperCase()}</p>
                    <p className="text-gray-600">{project.projectSummary}</p>
                  </div>
                ))
              :
              <div className=" flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
              <ImFileEmpty className="w-7 h-7"/>
              <p className="mt-2">No Project Details Added</p> 
              </div>
              }
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Education</h3>
              <div className="space-y-4">
                {developerDetails?.developerEducation?.length>0?
                 developerDetails?.developerEducation?.map((education, index) => (
                  <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <p className="text-gray-700 font-semibold">{education.collegeName.toUpperCase()}</p>
                    <p className="text-gray-600">{education.courseName}</p>
                    <p className="text-gray-600">{education.startDate.split('T')[0]} To {education.endDate.split('T')[0]}</p>
                  </div>
                ))
              :
              <div className=" flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
              <ImFileEmpty className="w-7 h-7"/>
              <p className="mt-2">No Education Added</p> 
              </div>
              }
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Experience</h3>
              <div className="space-y-4">
                {developerDetails?.developerExperience?.length>0?
                developerDetails?.developerExperience?.map((experience, index) => (
                  <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <p className="text-gray-700 font-semibold">{experience.company.toUpperCase()}</p>
                    <p className="text-gray-600">{experience.jobTitle}</p>
                    <p className="text-gray-600">{experience.startDate.split('T')[0]} To {experience.endDate.split('T')[0]}</p>
                  </div>
                ))
              :
              <div className=" flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
              <ImFileEmpty className="w-7 h-7"/>
              <p className="mt-2">No Experience Added</p> 
              </div>
              }
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Reviews</h3>
              <div className="space-y-4">
                {developerDetails?.developerReviews?.length>0?
                developerDetails?.developerReviews?.map((review, index) => (
                  <div
                  key={review?.id}
                  className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center mb-2">
                    <img
                      src={review?.reviewerDetails?.authorPhoto}
                      alt={review?.reviewerDetails?.author}
                      className="w-10 h-10 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="text-lg font-semibold">{review?.reviewerDetails?.author}</p>
                      <p className="text-sm text-gray-500">{review?.reviewerDetails?.authorJob}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{review?.content}</p>
                  <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
                    {renderStars(review?.rating)}
                    <span>{new Date(review?.date).toLocaleDateString()}</span>
                  </div>
                </div>
                ))
              :
              <div className=" flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
              <ImFileEmpty className="w-7 h-7"/>
              <p className="mt-2">No Reviews </p> 
              </div>
              }
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default React.memo(DeveloperDetailsModal);
