import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import DeveloperDetailsModal from "./DeveloperDetailsModal";
import { AcceptBid, getBidDetails } from "../../api/service";
import { useNavigate } from "react-router-dom";
import spinner from '../../assets/loader.gif';
import { Success } from "../../helper/popup";
import { updateWorkSuccess } from "../../Redux/user/userSlice";

const BidsModal = ({ bidDetails, handleCloseModal }) => {
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [isDeveloperModalOpen, setDeveloperModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bids, setBids] = useState([]);
  const [totalBids, setTotalBids] = useState(0);
  const bidsPerPage = 5; // Number of bids per page
  const { currentUser } = useSelector((state) => state.user);
  const navigate=useNavigate()
  const dispatch=useDispatch()

  useEffect(() => {
    const fetchBidDetails = async () => {
      setLoading(true);
      try {
        const res = await getBidDetails(bidDetails.workNumber, currentPage, bidsPerPage);
        setBids(res.data.data.bids);
        setTotalBids(res.data.data.totalBids);
      } catch (error) {
        console.error("Failed to fetch bid details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBidDetails();
  }, [bidDetails.workNumber, currentPage]);

  const handleViewMore = (developer) => {
    if(developer){
      setSelectedDeveloper(developer);
      setDeveloperModalOpen(true);
    }
  };
  const handleBidAccept=async(developer)=>{
     try{
     const res=await AcceptBid(developer,bidDetails.workNumber,bidDetails.workType)
     dispatch(updateWorkSuccess(res.data.data));
       handleCloseModal()
       Success(res.data.message)
     }catch(err){
      console.log(err)
     }

  }
  const handleDeveloperModalClose = () => {
    setDeveloperModalOpen(false);
    setSelectedDeveloper(null);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Modal
      isOpen={true}
      onRequestClose={handleCloseModal}
      contentLabel="Bids Modal"
      className="fixed inset-0 bg-gray-300 bg-opacity-75 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
      shouldCloseOnOverlayClick={true}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full max-w-6xl max-h-[75vh] mt-[95px] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Bids for {bidDetails.workName}</h2>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
        <p className="text-gray-600 mb-4">Bid End Date: {bidDetails.bidEndDate.split('T')[0]}</p>
        {loading ? (
          <div className="flex items-center justify-center h-[200px]">
            <img src={spinner} alt="Loading" className="w-16 h-16 animate-spin" />
          </div>
        ) : (
          <>
            {bids.length === 0 ? (
              <div className="flex flex-col items-center justify-center">
                <svg
                  className="w-12 h-12 mb-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 16h8M8 12h8M9 20h6a2 2 0 002-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <p className="text-gray-600 text-center">No bids yet</p>
              </div>
            ) : (
              <>
                <div className="overflow-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Developer Name</th>
                        <th className="py-2 px-4 border-b">Photo</th>
                        <th className="py-2 px-4 border-b">Role</th>
                        <th className="py-2 px-4 border-b">Completed Projects</th>
                        <th className="py-2 px-4 border-b">Deliverd In</th>
                        <th className="py-2 px-4 border-b">Bid Amount</th>
                        <th></th>
                        {currentUser.data.role === 'client' && <th className="py-2 px-4 border-b"></th>}
                      </tr>
                    </thead>
                    <tbody>
                      {bids.map((bid, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border-b text-center">{bid.developerName}</td>
                          <td className="py-2 px-4 border-b">
                            <img src={bid.developerPhoto} alt="Developer" className="w-10 h-10 object-cover rounded-full m-auto" />
                          </td>
                          <td className="py-2 px-4 border-b text-center">{bid.developerRole}</td>
                          <td className="py-2 px-4 border-b text-center">{bid.completedProjects}</td>
                          <td className="py-2 px-4 border-b text-center">{bid.deliveryTime}</td>
                          <td className="py-2 px-4 border-b text-center">{bid.bidAmount}</td>
                          <td onClick={() => handleViewMore(bid.developer)} className="py-2 px-4 border-b text-center text-sm text-blue-600 cursor-pointer hover:text-blue-500">View More</td>
                          {currentUser.data.role==='client'&&
                          
                           <td onClick={()=>handleBidAccept({devId:bid.developer,bidAmount:bid.bidAmount,deliveryTime:bid.deliveryTime,devName:bid.developerName})} className="py-2 px-4 border-b text-center rounded border-[1px] hover:bg-blue-500 hover:text-white cursor-pointer">Accept</td>
                         }
                        
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="flex justify-center mt-4 space-x-1">
                  <button
                    className={`px-4 py-2 border rounded-l-lg ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  {[...Array(Math.ceil(totalBids / bidsPerPage)).keys()].map((pageNumber) => (
                    <button
                      key={pageNumber}
                      className={`px-4 py-2 border ${currentPage === pageNumber + 1 ? "bg-gray-300" : "hover:bg-gray-200"}`}
                      onClick={() => paginate(pageNumber + 1)}
                    >
                      {pageNumber + 1}
                    </button>
                  ))}
                  <button
                    className={`px-4 py-2 border rounded-r-lg ${currentPage === Math.ceil(totalBids / bidsPerPage) ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(totalBids / bidsPerPage)}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
      {/* Developer Details Modal */}
      <DeveloperDetailsModal
        developer={selectedDeveloper}
        isOpen={isDeveloperModalOpen}
        onClose={handleDeveloperModalClose}
      />
    </Modal>
  );
};

export default BidsModal;
