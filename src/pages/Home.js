import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { fetchPopularMovies, fetchGenres, fetchMoviesByGenre } from '../services/movieService';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/PricingPlans/Card';
import MovieCard from '../components/MovieCard'; 
import RecommendedMovies from '../components/RecommendedMovies'; 
import { useTranslation } from 'react-i18next';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import filmback from '../assets/filmback.jpg';

const baseURL = 'https://image.tmdb.org/t/p/w500';

const Home = () => {
  const { t } = useTranslation();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [recentMovies, setRecentMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [animationMovies, setAnimationMovies] = useState([]);

  const plans = [
    {
      title: t('Starter'),
      features: [
        t('7 days'),
        t('720p Resolution'),
        t('Limited Availability'),
        t('Desktop Only'),
        t('Limited Support')
      ],
      price: t('Free'),
      buttonLabel: t('REGISTER'),
    },
    {
      title: t('Premium'),
      features: [
        t('1 Month'),
        t('Full HD'),
        t('Lifetime Availability'),
        t('TV & Desktop'),
        t('24/7 Support')
      ],
      price: '$19.99',
      buttonLabel: t('CHOOSE PLAN'),
    },
    {
      title: t('Cinematic'),
      features: [
        t('2 Months'),
        t('Ultra HD'),
        t('Lifetime Availability'),
        t('Any Device'),
        t('24/7 Support')
      ],
      price: '$39.99',
      buttonLabel: t('CHOOSE PLAN'),
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetchPopularMovies();
      setMovies(response.results);
      setRecentMovies(response.results.slice(0, 6));
    };

    const loadGenres = async () => {
      const genresList = await fetchGenres();
      const genresMap = {};
      genresList.forEach(genre => {
        genresMap[genre.id] = genre.name;
      });
      setGenres(genresMap);
    };

    const loadGenreMovies = async () => {
      const actionResponse = await fetchMoviesByGenre(28, 10); 
      const horrorResponse = await fetchMoviesByGenre(27, 10); 
      const animationResponse = await fetchMoviesByGenre(16, 5); 

      setActionMovies(actionResponse?.results || []);
      setHorrorMovies(horrorResponse?.results || []);
      setAnimationMovies(animationResponse?.results || []);
    };

    getMovies();
    loadGenres();
    loadGenreMovies();
  }, []);

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

  return (
    <div className="relative">
      {/* Arka plan, başlık ve slider */}
      <div
        className="relative h-auto bg-cover bg-center"
        style={{
          backgroundImage: `url(${filmback})`,
          boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.8)',
        }}
      >
        <div className="container mx-auto px-side-padding py-5">
          <h1 className="text-left text-4xl font-ubuntu text-white mb-0">
            <span className="font-bold">{t('NEW ITEMS')}</span> 
            <span className="font-light"> {t('OF THIS SEASON')}</span>
          </h1>
        </div>

        <div className="container mx-auto px-side-padding py-4">
          <Slider {...settings}>
            {movies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} genres={genres} />
            ))}
          </Slider>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-pink-500"></div>
      </div>

      {/* Recently Updated Bölümü */}
      <div className="container mx-auto px-side-padding py-8 relative z-10">
        <h2 className="text-white font-ubuntu text-3xl md:text-4xl lg:text-custom-title mb-8 text-left">{t('Recently Updated')}</h2>
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
                    <p className="text-pink-500 text-sm md:text-base mb-2">{genres[movie.genre_ids[0]] || t('Unknown')}</p>
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

        {/* CATALOG Button */}
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => navigate('/catalog')}
            className="bg-pink-600 text-white px-6 py-3 rounded-lg transition-all duration-500 hover:brightness-125 hover:shadow-hover-glow"
          >
            {t('TO CATALOG')}
          </button>
        </div>
      </div>

      <RecommendedMovies 
        actionMovies={actionMovies} 
        horrorMovies={horrorMovies} 
        animationMovies={animationMovies} 
        genres={genres} 
        title={t('Recommended For You')} 
      />

      <div className="container mx-auto px-side-padding py-12 relative z-10">
        <h2 className="text-white font-ubuntu text-3xl md:text-4xl lg:text-custom-title mb-8 text-left">{t('Select Your Plan')}</h2>
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
