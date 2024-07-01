import React from 'react'

const TermsAndCondition = ({ isOpen, onClose }) => {

    if (!isOpen) return null;
    return (
      <div
        id="default-modal"
        tabindex="-1"
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50"
      >
        <div className="relative w-full max-w-2xl max-h-full p-4">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 pt-2 pb-4">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Terms and Conditions
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              By using CodeSquad, you agree to our Terms and Conditions. This agreement governs your use of our platform.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
               -Users include anyone utilizing the platform, with "Clients" posting jobs and "Freelancers" offering services. Key terms are defined for clarity in this agreement.<br/>
               -Register an account to use our services and maintain confidentiality of your login details. You're responsible for activities under your account.<br/>
               -Users must use the platform lawfully and ethically, avoiding fraud and harassment. Compliance with local laws is required.<br/>
               -For support, contact us at <a className='text-blue-500 hover:underline' href='codesquad2211@gmail.com'>codesquad2211@gmail.com.</a> We're available to address any inquiries or issues.<br/>
              </p>
            </div>
           
          </div>
        </div>
      </div>
    );
}

export default TermsAndCondition
