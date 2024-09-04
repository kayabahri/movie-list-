import React from 'react';
import { Link } from 'react-router-dom';

const baseURL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie, genres }) => {
  const getPrimaryGenre = (genreIds) => {
    if (!genreIds || genreIds.length === 0) return "Unknown";
    return genres[genreIds[0]] || "Unknown";
  };

  return (
    <div className="px-2">
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative rounded-lg overflow-hidden group">
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src={`${baseURL}${movie.poster_path}`} 
              alt={movie.title} 
              className="w-full h-40 md:h-60 lg:h-80 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110" 
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
          </div>
          <div className="p-4 bg-gray-900 bg-opacity-5">
            <h3 className="text-white text-base md:text-lg font-ubuntu font-medium text-left">{movie.title}</h3>
            <p className="text-pink-500 text-sm mb-2 text-left">
              {getPrimaryGenre(movie.genre_ids)}
            </p>
            <div className="flex items-center text-left">
              <svg className="w-4 md:w-5 h-4 md:h-5 mr-1 align-middle" fill="url(#grad1)" viewBox="0 0 20 20">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%">
                    <stop offset="0%" style={{ stopColor: '#ff5860', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#ff55a5', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <path d="M9.049.316a.626.626 0 011.902 0l1.799 3.64 4.018.583a.626.626 0 01.346 1.068L13.905 8.34l.685 3.995a.626.626 0 01-.91.659L10 11.54l-3.68 1.936a.626.626 0 01-.91-.658l.685-3.996-2.909-2.732a.626.626 0 01.346-1.068l4.018-.583L9.049.316z" />
              </svg>
              <span className="text-white text-sm md:text-base font-ubuntu align-middle">{movie.vote_average.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
