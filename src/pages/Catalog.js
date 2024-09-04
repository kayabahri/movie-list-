import React, { useState, useEffect } from 'react';
import ReusableHeader from '../components/ReusableHeader';
import cinemaImage from '../assets/cinema.jpg';
import { fetchPopularMovies } from '../services/movieService';
import Pagination from '../components/Pagination';

const Catalog = () => {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  const loadMovies = async (page) => {
    const data = await fetchPopularMovies(page, moviesPerPage);
    setMovies(data.results);
    setTotalResults(data.total_results);
  };

  useEffect(() => {
    loadMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const baseURL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="bg-gray-900 text-white font-ubuntu max-w-custom-max mx-auto mt-[-64px]">
      <ReusableHeader
        title="Catalog"
        breadcrumb="Catalog"
        backgroundImage={cinemaImage}
      />

      {/* Filtreleme Seçenekleri */}
      <div className="px-side-padding py-8 flex items-center justify-between space-x-4">
        <div className="flex space-x-4">
          <button className="bg-gray-800 text-white py-2 px-4 rounded-lg">All genres</button>
          <button className="bg-gray-800 text-white py-2 px-4 rounded-lg">Any quality</button>
          <button className="bg-gray-800 text-white py-2 px-4 rounded-lg">Any rating</button>
          <button className="bg-gray-800 text-white py-2 px-4 rounded-lg">Relevance</button>
        </div>
        <button className="bg-gradient-pink text-white py-2 px-6 rounded-lg shadow-custom-pink">APPLY</button>
      </div>

      {/* Filmler Listesi */}
      <div className="px-side-padding py-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="relative bg-gray-800 p-4 rounded-lg shadow-lg group">
            <img 
              src={`${baseURL}${movie.poster_path}`} 
              alt={movie.title} 
              className="rounded-lg mb-4 w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-pink opacity-0 group-hover:opacity-40 transition-opacity duration-300 flex justify-center items-center rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 md:h-12 lg:h-16 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-4.88-2.81A1 1 0 008 9.117v5.766a1 1 0 001.872.615l4.88-2.81a 1 1 0 000-1.72z"
                />
              </svg>
            </div>
            <h3 className="text-white text-lg font-medium mt-2">{movie.title}</h3>
            <p className="text-pink-500 text-sm">{movie.vote_average}</p>
            <p className="text-gray-400 text-sm">{movie.genre_ids && movie.genre_ids[0]}</p> {/* İlk türü göster */}
          </div>
        ))}
      </div>

      {/* Sayfalama */}
      <div className="flex justify-center mt-8">
        <Pagination
          currentPage={currentPage}
          totalMovies={totalResults}
          moviesPerPage={moviesPerPage}
          paginate={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Catalog;
