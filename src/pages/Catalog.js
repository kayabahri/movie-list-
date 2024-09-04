import React, { useState, useEffect } from 'react';
import ReusableHeader from '../components/ReusableHeader';
import cinemaImage from '../assets/cinema.jpg';
import { fetchPopularMovies, fetchGenres } from '../services/movieService';
import Pagination from '../components/Pagination';
import MovieCard from '../components/MovieCard';

const Catalog = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  const loadMovies = async (page) => {
    const data = await fetchPopularMovies(page, moviesPerPage);
    setMovies(data.results);
    setTotalResults(data.total_results);
  };

  const loadGenres = async () => {
    const genresList = await fetchGenres();
    const genresMap = {};
    genresList.forEach((genre) => {
      genresMap[genre.id] = genre.name;
    });
    setGenres(genresMap);
  };

  useEffect(() => {
    loadMovies(currentPage);
    loadGenres();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
          <button className="bg-gray-800 text-white py-2 px-4 rounded-lg">
            All genres
          </button>
          <button className="bg-gray-800 text-white py-2 px-4 rounded-lg">
            Any quality
          </button>
          <button className="bg-gray-800 text-white py-2 px-4 rounded-lg">
            Any rating
          </button>
          <button className="bg-gray-800 text-white py-2 px-4 rounded-lg">
            Relevance
          </button>
        </div>
        <button className="bg-gradient-pink text-white py-2 px-6 rounded-lg shadow-custom-pink">
          APPLY
        </button>
      </div>

      {/* Filmler Listesi */}
      <div className="px-side-padding py-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={genres} />
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
