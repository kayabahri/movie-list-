import React from 'react';
import Slider from 'react-slick';
import MovieCard from './MovieCard';

const RecommendedMovies = ({ actionMovies, horrorMovies, animationMovies, genres, title }) => {
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
    <div className="container mx-auto px-side-padding py-8 relative z-10">
      {title && (
        <h2 className="text-white font-ubuntu text-3xl md:text-4xl lg:text-custom-title mb-8 text-left">
          {title}
        </h2>
      )}
      <Slider {...settings}>
        {(actionMovies || []).concat(horrorMovies || [], animationMovies || []).map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={genres} />
        ))}
      </Slider>
    </div>
  );
};

export default RecommendedMovies;
