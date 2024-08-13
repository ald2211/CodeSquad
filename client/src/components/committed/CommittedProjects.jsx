import React, { useEffect, useState } from 'react';
import { getAllCommittedProjects } from '../../api/service';
import spinner from '../../assets/loader.gif';
import { TbHourglassEmpty } from "react-icons/tb";
import SearchBar from '../Home/SearchBar';
import Pagination from '../UserTablePagination';
import { useSelector } from 'react-redux';
import { PiVideoConferenceLight } from "react-icons/pi";
import { BsChatSquareDots } from "react-icons/bs";
import { FiHelpCircle } from "react-icons/fi";
import ChatBox from './ChatBox';
import { CiCircleAlert } from "react-icons/ci";
import AddCompletedProjectLinkModal from './AddCompletedProjectLinkModal';
import { useSocketContext } from '../../context/socketContext';
import WorkStatus from './WorkStatus';

const CommittedProjects = () => {
  const [committed, setCommitted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading,setUploading]=useState(false)
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isChatBoxVisible, setChatBoxVisible] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const itemsPerPage = 10;
  const { currentUser } = useSelector((state) => state.user);
  const [isDescriptionExpanded,setIsDescriptionExpanded]=useState(false)
  const [workDetails, setWorkDetails] = useState({}); 
  const [addLink,setAddLink]=useState(false)
  const [copied, setCopied] = useState(false);
  const { socket, onlineUsers } = useSocketContext();

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };
  useEffect(() => {
    const getCommittedProjects = async () => {
      try {
        let res = await getAllCommittedProjects(currentPage, itemsPerPage, search);
        const { data, totalPages, totalItems, adminId } = res.data;
        setCommitted(data);
        setTotalPages(totalPages);
        setTotalItems(totalItems);
        setAdminId(adminId);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.log('committedErr:', err);
      } finally {
        setLoading(false);
      }
    };
    getCommittedProjects();
  }, [currentPage, itemsPerPage, search]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleVideoCallJoin = (work) => {
    const id = work.workNumber;
    let user = currentUser.data._id;
    let userName = currentUser.data.name;
    window.open(`/room/${id}/${user}/${userName}`, '_blank');
  };

  const handleChatClick = (role, devId, clientId) => {
    if (role === 'admin') {
      setReceiverId(adminId);
    } else if (currentUser.data.role === 'client') {
      setReceiverId(devId);
    } else if(currentUser.data.role==='developer') {
      setReceiverId(clientId);
    }
    setChatBoxVisible(true);
  };

  const handleCloseAddProjectLinkModal = () => {
    setAddLink(false);
    setWorkDetails(null);
  };
  const handleCopyLink = (link) => {
    if (link) {
      navigator.clipboard.writeText(link)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  return (
    <>
    <div className="max-w-6xl mx-auto pt-3 space-y-6 mt-[90px] mb-2">
      <SearchBar setSearch={setSearch} />

      {loading ? (
        <div className="flex items-center justify-center h-screen bg-white">
          <img src={spinner} alt="Loading" className="w-16 h-16 animate-spin mb-32" />
        </div>
      ) : committed?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[380px] text-center">
          <TbHourglassEmpty className="w-12 h-12" />
          <p className="text-gray-600">No committed projects</p>
        </div>
      ) : (
        committed.map((work, index) => (
          <div key={index} className="bg-white flex-wrap lg:flex-nowrap md:flex-nowrap  shadow-md rounded-lg overflow-hidden mb-6 p-4 flex ">
            {/* Section 1: Project Details */}
            <div className="mr-3 flex-auto">
  <div className="p-6 max-w-xl  bg-white rounded-xl shadow-md space-y-4 ">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-800">
        {work.workName}
        <span className='text-sm font-normal ml-3'>({work.workNumber.toUpperCase()})</span>
      </h2>
    </div>

    <div className="flex items-center justify-between text-gray-600">
      <p className="font-semibold text-lg">Payment Type:</p>
      <p className="mt-1">{work.workType}</p>
    </div>

    <div className="flex flex-col">
      <p className="font-semibold text-lg text-gray-600">Description:</p>
      <p className="text-gray-600 mb-4 text-sm">
        {isDescriptionExpanded
          ? work.description
          : `${work.description.slice(0, 100)}`}
        {work.description.length > 100 && (
          <button
            onClick={toggleDescription}
            className="text-blue-500 ml-2 text-sm"
          >
            {isDescriptionExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </p>
    </div>

    <div className="flex items-center justify-between text-gray-600">
      <p className="font-semibold text-lg">Attachment:</p>
      {work?.attachMents?<p
                  className="text-sm text-blue-500 hover:underline cursor-pointer mt-1 mb-1"
                  onClick={() =>
                    window.open(`${work.attachMents.split("__")[0]}`)
                  }
                >
                  Attachment
                </p>
                :
                <p>no attachments</p>
              }
    </div>

    <div className="flex items-center justify-between text-gray-600">
      <p className="font-semibold text-lg">Delivery Time:</p>
      <p className="mt-1">{work.bids.find((dev) => dev.developer === work.developerId)?.deliveryTime} Days</p>
    </div>

    <div className="flex items-center justify-between text-gray-600">
      <p className="font-semibold text-lg">Budget:</p>
      <p className="mt-1">₹{work.budget}</p>
    </div>

    <div className="flex items-center justify-between text-gray-600">
      <p className="font-semibold text-lg">Bid Amount:</p>
      <p className="mt-1">₹{work.bids.find((dev) => dev.developer === work.developerId)?.bidAmount}</p>
    </div>
  </div>
</div>


            {/* Section 2: Project Status */}
            <div className="w-full mt-6">
          <WorkStatus work={work}/>
           {/* Section 3: Developer and Client Details */}
 <div className="p-4">
              <div className=" items-center mb-4 mt-3 ">
                <div className="flex items-center mb-3">
                  <img
                    src={work.clientId.avatar}
                    alt="Client profile picture"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      {work.clientId.name}
                    </h3>
                    <p className="text-gray-600 text-sm">Client</p>
                  </div>
                  {currentUser?.data?.role==='developer'&&<div className="flex  items-center ml-auto">
                <button onClick={() => handleVideoCallJoin(work)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none transition duration-200">
                  <PiVideoConferenceLight className='w-8 h-8 text-center' />
                </button>
                <button onClick={() => handleChatClick('', work.developerId, work.clientId._id)} className="relative bg-blue-500 ml-2 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none transition duration-200">
                  <BsChatSquareDots className='w-8 h-8' />
                  <span
                        className={`absolute left-14 bottom-10  block w-3 h-3 rounded-full ${onlineUsers.includes(work.clientId._id) ? 'bg-green-500' : 'bg-gray-400'}`}
                        title={onlineUsers.includes(adminId) ? 'Online' : 'Offline'}
                      />
                </button>
              </div>}
                </div>
                <div className="flex  ">
                  <img
                    src={work.bids.find((dev) => dev.developer === work.developerId)?.developerPhoto}
                    alt="Developer profile picture"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      {work.bids.find((dev) => dev.developer === work.developerId)?.developerName}
                    </h3>
                    <p className="text-gray-600 text-sm">Developer</p>
                  </div>
                  {currentUser?.data?.role==='client'&&<div className="flex  items-center ml-auto">
                <button onClick={() => handleVideoCallJoin(work)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none transition duration-200">
                  <PiVideoConferenceLight className='w-8 h-8 text-center' />
                </button>
                <button onClick={() => handleChatClick('', work.developerId, work.clientId._id)} className="bg-blue-500 relative ml-2 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none transition duration-200">
                  <BsChatSquareDots className='w-8 h-8' />
                <span
                        className={`absolute left-14 bottom-10 block w-3 h-3 rounded-full ${onlineUsers.includes(work.clientId._id) ? 'bg-green-500' : 'bg-gray-400'}`}
                        title={onlineUsers.includes(work.developerId) ? 'Online' : 'Offline'}
                      />
                </button>
              </div>}
                </div>
              </div>
           { currentUser?.data?.role==='developer'&&
           <>
          <div className="flex flex-col sm:flex-row items-center mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
  <button
     onClick={() => {
      setAddLink(true);
      setWorkDetails({workNumber:work.workNumber,key:index});
    }}
    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700   disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={uploading}
  >
    {uploading ? 'Submitting...' : work?.projectLink ? 'Update Project Link' : 'Submit Project Link'}
  </button>
   <div className="relative">
      {work?.projectLink && (
        <div className="flex items-center space-x-2 p-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
          <span
            className="text-sm text-gray-700 truncate cursor-pointer hover:text-blue-500"
            onClick={()=>handleCopyLink(work?.projectLink)}
            title="Click to copy link"
          >
            {work.projectLink.length > 30 ? `${work.projectLink.slice(0, 30)}...` : work.projectLink}
          </span>
         
        </div>
      )}
      {copied && (
        <div className="absolute top-0 left-0 right-0 px-4 py-2  text-center text-white bg-green-500 rounded-md">
          copied
        </div>
      )}
    </div>
</div>
          </>
          }
            </div>
            {currentUser?.data?.role==='developer'&&<div className='flex items-center w-full bg-blue-100 p-4 rounded-lg shadow-md mt-7'>
      <CiCircleAlert className='text-blue-600 text-2xl mr-3' />
      <p className='text-blue-800 font-semibold'>
      Once you complete the work, upload the completed project link and inform the admin.
      </p>
    </div>}
            <div className='fixed bottom-3 right-1'>
                    <button onClick={() => handleChatClick('admin')} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 focus:outline-none transition duration-200">
                      <FiHelpCircle className='w-8 h-8' />
                    </button>
                    <span
                        className={`absolute bottom-10 right-0 block w-3 h-3 rounded-full ${onlineUsers.includes(adminId) ? 'bg-green-500' : 'bg-gray-400'}`}
                        title={onlineUsers.includes(adminId) ? 'Online' : 'Offline'}
                      />
                  </div>
        </div>
       
          </div>
        ))
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {isChatBoxVisible && (
        <div className="fixed right-3 bottom-4 bg-white shadow-lg border-l border-gray-300 flex flex-col z-50">
          <ChatBox receiver={receiverId} close={setChatBoxVisible} />
        </div>
      )}
    </div>
    <AddCompletedProjectLinkModal
    isOpen={addLink}
    work={workDetails}
    committed={committed}
    setCommitted={setCommitted}
    setUploading={setUploading}
    handleClose={handleCloseAddProjectLinkModal}
  />
    </>
  );
};

export default CommittedProjects;
