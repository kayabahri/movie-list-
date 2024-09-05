import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { fetchPopularMovies, fetchGenres, fetchTrendingMovie, fetchMoviesByGenre } from '../services/movieService';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/PricingPlans/Card';
import MovieCard from '../components/MovieCard'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const baseURL = 'https://image.tmdb.org/t/p/w500';

const Home = ({ searchResults }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [trendingMovie, setTrendingMovie] = useState(null);
  const [recentMovies, setRecentMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [animationMovies, setAnimationMovies] = useState([]);

  const plans = [
    {
      title: 'Starter',
      features: ['7 days', '720p Resolution', 'Limited Availability', 'Desktop Only', 'Limited Support'],
      price: 'Free',
      buttonLabel: 'REGISTER',
    },
    {
      title: 'Premium',
      features: ['1 Month', 'Full HD', 'Lifetime Availability', 'TV & Desktop', '24/7 Support'],
      price: '$19.99',
      buttonLabel: 'CHOOSE PLAN',
    },
    {
      title: 'Cinematic',
      features: ['2 Months', 'Ultra HD', 'Lifetime Availability', 'Any Device', '24/7 Support'],
      price: '$39.99',
      buttonLabel: 'CHOOSE PLAN',
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setMovies(searchResults);
    } else {
      const getMovies = async () => {
        const response = await fetchPopularMovies();
        setMovies(response.results);
        setRecentMovies(response.results.slice(0, 6));
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

    const loadGenreMovies = async () => {
      const actionResponse = await fetchMoviesByGenre(28, 10); // Aksiyon
      const horrorResponse = await fetchMoviesByGenre(27, 10); // Korku
      const animationResponse = await fetchMoviesByGenre(16, 5); // Animasyon

      setActionMovies(actionResponse?.results || []);
      setHorrorMovies(horrorResponse?.results || []);
      setAnimationMovies(animationResponse?.results || []);
    };

    loadGenres();
    loadTrendingMovie();
    loadGenreMovies();
  }, [searchResults]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const getPrimaryGenre = (genreIds) => {
    if (!genreIds || genreIds.length === 0) return "Unknown";
    return genres[genreIds[0]] || "Unknown";
  };

  return (
    <div className="relative">
      {trendingMovie && (
        <div
          className="
            absolute top-0 left-0 right-0 z-0 
            before:absolute before:inset-0 before:bg-gradient-pink before:opacity-40
            bg-cover bg-center bg-no-repeat
          "
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${trendingMovie.backdrop_path})`,
            height: 'calc(100vh - 365px)',
            filter: 'brightness(0.2) opacity(0.5)',
          }}
        ></div>
      )}
      <div className="container mx-auto px-side-padding py-8 relative z-10">
        <h2 className="text-white font-ubuntu text-3xl md:text-4xl lg:text-custom-title mb-8 text-left">NEW ITEMS OF THIS SEASON</h2>
        <Slider {...settings}>
          {movies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} genres={genres} />
          ))}
        </Slider>
      </div>

      {/* Responsive Gradient Bar */}
      <div className="h-0.5 w-full bg-gradient-pink mt-8 relative z-10 sm:h-0.5 md:h-0.5 lg:h-0.75"></div>
      
      <div className="container mx-auto px-side-padding py-8 relative z-10">
        <h2 className="text-white font-ubuntu text-3xl md:text-4xl lg:text-custom-title mb-8 text-left">Recently Updated</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {recentMovies.map((movie, index) => (
            <div key={index} className="bg-transparent p-4 rounded-lg shadow-lg text-left flex group items-start">
              <Link to={`/movie/${movie.id}`} className="flex">
                <div className="relative w-1/3 h-auto overflow-hidden rounded-lg">
                  <img src={`${baseURL}${movie.poster_path}`} alt={movie.title} className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110" />
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
                        d="M14.752 11.168l-4.88-2.81A1 1 0 008 9.117v5.766a 1 1 0 001.872.615l4.88-2.81a 1 1 0 000-1.72z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col justify-between w-2/3 ml-4">
                  <div>
                    <h3 className="text-white text-base md:text-lg font-ubuntu font-medium mb-1">{movie.title}</h3>
                    <p className="text-pink-500 text-sm md:text-base mb-2">{getPrimaryGenre(movie.genre_ids)}</p>
                    <div className="flex items-center mb-2">
                      <span className="text-white text-sm md:text-base font-ubuntu align-middle mr-2">{movie.vote_average.toFixed(2)}</span>
                      <span className="text-gray-400 text-xs md:text-sm font-ubuntu align-middle border px-1 rounded">HD</span>
                      <span className="text-gray-400 text-xs md:text-sm font-ubuntu align-middle border px-1 rounded ml-2">16+</span>
                    </div>
                  </div>
                  <p className="text-gray-400 mt-2 text-sm md:text-base">{movie.overview.substring(0, 100)}...</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* TO CATALOG Button */}
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => navigate('/catalog')}
            className="bg-pink-600 text-white px-6 py-3 rounded-lg transition-all duration-500 hover:brightness-125 hover:shadow-hover-glow"
          >
            TO CATALOG
          </button>
        </div>
      </div>

      <div className="container mx-auto px-side-padding py-8 relative z-10">
        <h2 className="text-white font-ubuntu text-3xl md:text-4xl lg:text-custom-title mb-8 text-left">Recommended For You</h2>
        <Slider {...settings}>
          {(actionMovies || []).concat(horrorMovies || [], animationMovies || []).map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} genres={genres} />
          ))}
        </Slider>
      </div>
      <div className="container mx-auto px-side-padding py-12 relative z-10">
        <h2 className="text-white font-ubuntu text-3xl md:text-4xl lg:text-custom-title mb-8 text-left">Select Your Plan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              title={plan.title} 
              features={plan.features} 
              price={plan.price} 
              buttonLabel={plan.buttonLabel} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
