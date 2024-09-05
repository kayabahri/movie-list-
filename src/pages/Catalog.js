import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import Filter from '../components/Filters';
import ReusableHeader from '../components/ReusableHeader';
import { fetchPopularMovies, searchMovies, fetchMoviesByGenre } from '../services/movieService';
import cinemaImage from '../assets/cinema.jpg';
import RecommendedMovies from '../components/RecommendedMovies';

const Catalog = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  const location = useLocation();

  const [actionMovies, setActionMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [animationMovies, setAnimationMovies] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');

    const loadMovies = async () => {
      let data;
      if (searchQuery) {
        data = await searchMovies(searchQuery, currentPage);
      } else {
        data = await fetchPopularMovies(currentPage, 12); 
      }
      setMovies(data.results);
      setTotalMovies(data.total_results);
    };

    const loadGenreMovies = async () => {
      const actionResponse = await fetchMoviesByGenre(28, 10); 
      const horrorResponse = await fetchMoviesByGenre(27, 10); 
      const animationResponse = await fetchMoviesByGenre(16, 5); 

      setActionMovies(actionResponse?.results || []);
      setHorrorMovies(horrorResponse?.results || []);
      setAnimationMovies(animationResponse?.results || []);
    };

    loadMovies();
    loadGenreMovies();
  }, [location.search, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gray-900 text-white font-ubuntu max-w-custom-max mx-auto">
      <ReusableHeader
        title="Catalog"
        breadcrumb="Catalog"
        backgroundImage={cinemaImage}
      />
      <div className="container mx-auto px-side-padding py-16">
        <div className="mb-8">
          <Filter />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 md:gap-2 lg:gap-2">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <div className="mt-12">
          <Pagination
            moviesPerPage={12} 
            totalMovies={totalMovies}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <RecommendedMovies 
        actionMovies={actionMovies} 
        horrorMovies={horrorMovies} 
        animationMovies={animationMovies} 
        genres={{}} 
      />
    </div>
  );
};

export default Catalog;
