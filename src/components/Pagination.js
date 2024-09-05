import React from 'react';

const Pagination = ({ moviesPerPage, totalMovies, onPageChange, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  let startPage, endPage;

  if (totalPages <= 10) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-8 px-side-padding">
      <ul className="flex space-x-2">
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-pink-500 transition-colors duration-300"
            >
              &laquo; Prev
            </button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                currentPage === number ? 'bg-pink-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-pink-500 hover:text-white'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-pink-500 transition-colors duration-300"
            >
              Next &raquo;
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
