import React from 'react';

const WorksPagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages === 0) return null; // Do not render if there are no pages

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <li key={pageNumber}>
            <button
              onClick={() => paginate(pageNumber + 1)}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === pageNumber + 1 ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" : ""}`}
            >
              {pageNumber + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages && "opacity-50 cursor-not-allowed"}`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default WorksPagination;
