import React, { useEffect, useState } from 'react';
import { getAllCommittedProjects } from '../../api/service';
import spinner from '../../assets/loader.gif';
import { TbHourglassEmpty } from "react-icons/tb";
import SearchBar from '../Home/SearchBar';
import Pagination from '../UserTablePagination';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChatBox from './ChatBox';


const CommittedProjects = () => {
  const navigate = useNavigate();
  const [committed, setCommitted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isChatBoxVisible, setChatBoxVisible] = useState(false); // State for chat box visibility
  const [adminId,setAdminId]=useState('')
  const [receiverId, setReceiverId] = useState('');
  const itemsPerPage = 10;
  const { currentUser } = useSelector((state) => state.user);

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

  const handleChatClick = (role,devId,clientId) => {
    if(role==='admin'){
        setReceiverId(adminId)
    }else if(currentUser.data.role==='client'){
        setReceiverId(devId)
    }else{
        setReceiverId(clientId)
    }
    setChatBoxVisible(true); // Show the chat box
  };

  console.log('admin:', receiverId);
  return (
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
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{work.workName}
                  <span className='text-sm font-normal ml-3'>({work.workNumber.toUpperCase()})</span>
                </h2>
                <div className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold uppercase text-white transition duration-200">
                  {work.workStatus}
                </div>
              </div>
              {/* Section 1: Developer and Client Details */}
              <div className="flex justify-between mt-7">
                <div className="flex items-center mb-4">
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
                </div>
                <div className="flex items-center mb-4">
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
                </div>
              </div>
              {/* Section 2: Project Details */}
              <div className="flex justify-between items-center mb-1">
                <p className="text-gray-600">Type: {work.workType}</p>
                <p className="text-gray-600">Delivery Time: {work.bids.find((dev) => dev.developer === work.developerId)?.deliveryTime} Days</p>
              </div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-gray-600">Budget: ₹{work.budget}</p>
                <p className="text-gray-600">Bid Amount: ₹{work.bids.find((dev) => dev.developer === work.developerId)?.bidAmount}</p>
              </div>
              <div className="flex justify-between items-center mt-4 mb-4">
                <button onClick={() => handleVideoCallJoin(work)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none transition duration-200">
                  Video Call
                </button>
                <button onClick={()=>handleChatClick('',work.developerId,work.clientId._id)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none transition duration-200">
                  Chat
                </button>
              </div>
              {/* Section 3: Payment Details */}
              <div className="mt-6">
                {currentUser.data.role === 'developer' && (
                  <>
                    <input type="file" className="w-full mb-4 border border-gray-300 rounded-md p-2" />
                    <button onClick={()=>handleChatClick('admin')} className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none transition duration-200">
                      Inform Complete
                    </button>
                  </>
                )}
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

      {/* Chat Box */}
      {isChatBoxVisible && (
        <div className="fixed right-3 bottom-4  bg-white shadow-lg border-l border-gray-300 flex flex-col z-50">
          <ChatBox receiver={receiverId} close={setChatBoxVisible} />
        </div>
      )}
    </div>
  );
};

export default CommittedProjects;
