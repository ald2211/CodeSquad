import React from 'react';

const WorkDetails = ({ work }) => {
  const deliveryTime = work.bids.find((dev) => dev.developer === work.developerId)?.deliveryTime;

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
      <div>
        <p className="text-gray-600 mb-1">Type: {work.workType}</p>
        <p className="text-gray-600 mb-1">Delivered in {deliveryTime} Days</p>
        <p className="text-gray-600 mb-1">Budget: ₹{work.budget}</p>
      </div>
      {work?.paymentId?.clientPayment==='received'?<a
        onClick={() =>
            window.open(work.projectLink)
          }
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow cursor-pointer"
      >
        Download Project
      </a>
     :
     <span className='w-[240px] bg-gray-200 p-2 rounded-md text-gray-500 text-md'>once payment is done you can download your project here</span>  
    }
    </div>
  );
};

export default WorkDetails;
