import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = ({ movie, isLoading }) => {
  if (isLoading) {
    return (
      <div className="block bg-white rounded-lg shadow-lg overflow-hidden">
        <Skeleton height={288} width="100%" />
        <div className="p-4">
          <Skeleton width="70%" height={20} />
          <Skeleton width="50%" height={20} />
        </div>
      </div>
    );
  }

  return (
    <Link to={`/movie/${movie.id}`} className="block bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-72 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-gray-500">{movie.release_date}</p>
      </div>
    </Link>
  );
};

export default SkeletonLoader;
