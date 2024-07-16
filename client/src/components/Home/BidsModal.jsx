import React, { useState } from "react";
import Modal from "react-modal";

// Dummy data for bids
const bids = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  developerName: `Developer ${index + 1}`,
  photo: "https://via.placeholder.com/50",
  completedProjects: Math.floor(Math.random() * 20),
  bidAmount: `$${Math.floor(Math.random() * 1000)}`,
}));

const BidsModal = ({ bidDetails, handleCloseModal }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const bidsPerPage = 5; // Number of bids per page

  const indexOfLastBid = currentPage * bidsPerPage;
  const indexOfFirstBid = indexOfLastBid - bidsPerPage;
  const currentBids = bids.slice(indexOfFirstBid, indexOfLastBid);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log('bidDetailsssss:',bidDetails)

  return (
    <Modal
      isOpen={true}
      onRequestClose={handleCloseModal}
      contentLabel="Bids Modal"
      className="fixed inset-0 bg-gray-300 bg-opacity-75 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
      shouldCloseOnOverlayClick={true}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full max-w-3xl max-h-[75vh] mt-[95px] overflow-auto">
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
        {
          bidDetails.bids.length===0?
          <div className="flex flex-col items-center justify-center ">
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
        :
        <>
        <div className="overflow-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Developer Name</th>
                <th className="py-2 px-4 border-b">Photo</th>
                <th className="py-2 px-4 border-b">Completed Projects</th>
                <th className="py-2 px-4 border-b">Bid Amount</th>
              </tr>
            </thead>
            <tbody>
              {
              bidDetails.bids.map((bid) => (
                <tr key={bid.developer}>
                  <td className="py-2 px-4 border-b text-center">{bid.developerName}</td>
                  <td className="py-2 px-4 border-b">
                    <img src={bid.developerPhoto} alt="Developer" className="w-10 h-10 object-cover rounded-full m-auto" />
                  </td>
                  <td className="py-2 px-4 border-b text-center">{bid.completedProjects}</td>
                  <td className="py-2 px-4 border-b text-center">{bid.bidAmount}</td>
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
          {[...Array(Math.ceil(bids.length / bidsPerPage)).keys()].map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-4 py-2 border ${currentPage === pageNumber + 1 ? "bg-gray-300" : "hover:bg-gray-200"}`}
              onClick={() => paginate(pageNumber + 1)}
            >
              {pageNumber + 1}
            </button>
          ))}
          <button
            className={`px-4 py-2 border rounded-r-lg ${indexOfLastBid >= bids.length ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastBid >= bids.length}
          >
            Next
          </button>
        </div>
        </>
        }
      </div>
    </Modal>
  );
};

export default BidsModal;
