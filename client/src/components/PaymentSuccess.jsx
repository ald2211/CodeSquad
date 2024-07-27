import React, { useState, useEffect } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const PaymentSuccess = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeout;
    if (isOpen) {
      setIsVisible(true);
      // Set timeout to close the modal after 3 seconds
      timeout = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 3000);
    } else {
      // Smoothly hide the modal by setting isVisible to false after the animation duration
      timeout = setTimeout(() => setIsVisible(false), 300);
    }

    // Cleanup timeout
    return () => clearTimeout(timeout);
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 transition-transform duration-300 ease-out ${isOpen ? 'scale-100' : 'scale-95'}`}>
        <div className="flex flex-col items-center">
          <FiCheckCircle className="text-green-500 text-6xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
          <p className="text-gray-600 text-center">
            Thank you for your payment. Your transaction was completed successfully.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
