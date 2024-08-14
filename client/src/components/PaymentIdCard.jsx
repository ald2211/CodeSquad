import React from "react";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";

const PaymentIdCard = ({ paymentId }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Payment Details
      </h3>
      <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md border border-gray-300">
        <div className="flex flex-col">
          <p className="text-sm text-gray-600">Payment ID:</p>
          <p className="text-lg font-medium text-blue-600 truncate">
            {paymentId}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="text-gray-500 hover:text-gray-700 transition duration-150"
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <FaClipboardCheck className="w-6 h-6" />
          ) : (
            <FaClipboard className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentIdCard;
