import React from 'react';

const Pagination = ({ moviesPerPage, totalMovies, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  let startPage, endPage;

  if (totalPages <= 10) {
    // Sayfa sayısı 10 veya daha azsa, tüm sayfaları göster
    startPage = 1;
    endPage = totalPages;
  } else {
    // Sayfa sayısı 10'dan fazlaysa, geçerli sayfa ve çevresindeki sayfaları göster
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
    <nav className="flex justify-center mt-4">
      <ul className="flex space-x-2">
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-blue-500 hover:text-white"
            >
              &laquo; Prev
            </button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? 'text-blue-500' : ''}>
            <button
              onClick={() => paginate(number)}
              className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-blue-500 hover:text-white"
            >
              {number}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-blue-500 hover:text-white"
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
