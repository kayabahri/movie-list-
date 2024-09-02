import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { fetchPopularMovies, fetchFilteredMovies, fetchGenres, fetchTrendingMovie } from '../services/movieService';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const baseURL = 'https://image.tmdb.org/t/p/w500';

const Home = ({ searchResults, filters }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [trendingMovie, setTrendingMovie] = useState(null);
  const [recentMovies, setRecentMovies] = useState([]);

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setMovies(searchResults);
      setIsSearching(true);
    } else {
      const getMovies = async () => {
        const response = await fetchPopularMovies();
        setMovies(response.results);
        setRecentMovies(response.results.slice(0, 6)); // Son 6 filmi al
        setIsSearching(false);
      };
      getMovies();
    }

    const loadGenres = async () => {
      const genresList = await fetchGenres();
      const genresMap = {};
      genresList.forEach(genre => {
        genresMap[genre.id] = genre.name;
      });
      setGenres(genresMap);
    };

    const loadTrendingMovie = async () => {
      const trending = await fetchTrendingMovie();
      setTrendingMovie(trending);
    };

    loadGenres();
    loadTrendingMovie();
  }, [searchResults]);

  useEffect(() => {
    if (!isSearching && Object.keys(filters).length > 0) {
      const getFilteredMovies = async () => {
        const response = await fetchFilteredMovies(filters);
        setMovies(response.results);
      };
      getFilteredMovies();
    }
  }, [filters, isSearching]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const getPrimaryGenre = (genreIds) => {
    if (!genreIds || genreIds.length === 0) return "Unknown";
    return genres[genreIds[0]] || "Unknown";
  };

  return (
    <div className="relative">
      {trendingMovie && (
        <div
          className="absolute top-0 left-0 right-0 z-0 before:absolute before:inset-0 before:bg-gradient-pink before:opacity-40"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${trendingMovie.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: 'calc(100vh - 335px)',
            top: '0',
            filter: 'brightness(0.2) opacity(0.5)',
          }}
        ></div>
      )}
      <div className="container mx-auto px-side-padding py-8 relative z-10">
        <h2 className="text-white font-ubuntu text-custom-title mb-8 text-left">NEW ITEMS OF THIS SEASON</h2>
        <Slider {...settings}>
          {movies.map((movie, index) => (
            <div key={index} className="px-2">
              <div className="relative rounded-lg overflow-hidden group">
                <img
                  src={`${baseURL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-80 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-pink opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.752 11.168l-4.88-2.81A1 1 0 008 9.117v5.766a1 1 0 001.872.615l4.88-2.81a1 1 0 000-1.72z"
                    />
                  </svg>
                </div>
                <div className="p-4 bg-gray-900 bg-opacity-5"> {/* Arka plan opaklığı daha da azaltıldı */}
                  <h3 className="text-white text-lg font-ubuntu font-medium text-left">{movie.title}</h3>
                  <p className="text-pink-500 text-sm mb-2 text-left">
                    {getPrimaryGenre(movie.genre_ids)}
                  </p>
                  <div className="flex items-center text-left">
                    <svg className="w-5 h-5 mr-1 align-middle" fill="url(#grad1)" viewBox="0 0 20 20">
                      <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%">
                          <stop offset="0%" style={{ stopColor: '#ff5860', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: '#ff55a5', stopOpacity: 1 }} />
                        </linearGradient>
                      </defs>
                      <path d="M9.049.316a.626.626 0 011.902 0l1.799 3.64 4.018.583a.626.626 0 01.346 1.068L13.905 8.34l.685 3.995a.626.626 0 01-.91.659L10 11.54l-3.68 1.936a.626.626 0 01-.91-.658l.685-3.996-2.909-2.732a.626.626 0 01.346-1.068l4.018-.583L9.049.316z" />
                    </svg>
                    <span className="text-white text-sm font-ubuntu align-middle">{movie.vote_average.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Çizgi */}
      <div className="h-1 w-full bg-gradient-pink mt-8 relative z-10"></div>
      
      {/* Recently Updated Section */}
      <div className="container mx-auto px-side-padding py-8 relative z-10">
        <h2 className="text-white font-ubuntu text-custom-title mb-8 text-left">Recently Updated</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {recentMovies.map((movie, index) => (
            <div key={index} className="bg-transparent p-4 rounded-lg shadow-lg text-left flex group"> {/* Arka plan tamamen şeffaf */}
              <img
                src={`${baseURL}${movie.poster_path}`}
                alt={movie.title}
                className="w-24 h-36 object-cover rounded-md mr-4 transition-transform duration-300 group-hover:scale-110"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-white text-lg font-ubuntu font-medium mb-1">{movie.title}</h3>
                  <p className="text-pink-500 text-sm mb-2">{getPrimaryGenre(movie.genre_ids)}</p>
                  <div className="flex items-center mb-2">
                    <span className="text-white text-sm font-ubuntu align-middle mr-2">{movie.vote_average.toFixed(2)}</span>
                    <span className="text-gray-400 text-xs font-ubuntu align-middle border px-1 rounded">HD</span>
                    <span className="text-gray-400 text-xs font-ubuntu align-middle border px-1 rounded ml-2">16+</span>
                  </div>
                </div>
                <p className="text-gray-400 mt-2">{movie.overview.substring(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
