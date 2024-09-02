import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/moviesSlice';
import MovieCard from '../components/MovieCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { fetchPopularMovies } from '../services/movieService';

const MovieList = ({ movies: propMovies }) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const movieStatus = useSelector((state) => state.movies.status);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (movieStatus === 'idle' && !propMovies) {
      const getMovies = async () => {
        const popularMovies = await fetchPopularMovies();
        dispatch(fetchMovies(popularMovies));
      };
      getMovies();
    }
  }, [movieStatus, dispatch, propMovies]);

  useEffect(() => {
    if (movieStatus === 'succeeded') {
      setIsLoading(false);
    }
  }, [movieStatus]);

  const displayedMovies = propMovies || movies;

  if (isLoading && !propMovies) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="block bg-white rounded-lg shadow-lg overflow-hidden">
            <Skeleton height={288} />
            <div className="p-4">
              <Skeleton width="70%" height={20} />
              <Skeleton width="50%" height={20} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (movieStatus === 'failed' && !propMovies) {
    return <div className="text-center text-red-500">Error loading movies.</div>;
  }

  if (!displayedMovies || displayedMovies.length === 0) {
    return <div className="text-center">No movies found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {displayedMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
