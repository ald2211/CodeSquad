import React, { useState } from 'react';

const WorkDetails = ({ work }) => {
  const [copied,setCopied]=useState(false)
  const deliveryTime = work.bids.find((dev) => dev.developer === work.developerId)?.deliveryTime;
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
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
      <div>
        <p className="text-gray-600 mb-1">Type: {work.workType}</p>
        <p className="text-gray-600 mb-1">Delivered in {deliveryTime} Days</p>
        <p className="text-gray-600 mb-1">Budget: ₹{work.budget}</p>
      </div>
      {work?.paymentId?.clientPayment==='received'?
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
     :
     <span className='w-[240px] bg-gray-200 p-2 rounded-md text-gray-500 text-md'>once payment is done you can download your project here</span>  
    }
    </div>
  );
};

export default WorkDetails;
