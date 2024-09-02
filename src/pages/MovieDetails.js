import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails } from '../services/movieService';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);
    };

    getMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-1/3 rounded-lg shadow-lg" />
        <div className="ml-6 w-2/3">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-700 mb-4">{movie.overview}</p>

          <h2 className="text-2xl font-bold mb-2">Genres</h2>
          <div className="flex flex-wrap mb-4">
            {movie.genres.map((genre) => (
              <Link
                to={`/movies/genre/${genre.id}`}
                key={genre.id}
                className="bg-blue-600 text-white px-3 py-1 rounded-full mr-2 mb-2 hover:bg-blue-800 transition-colors"
              >
                {genre.name}
              </Link>
            ))}
          </div>

          {movie.credits && movie.credits.cast && movie.credits.cast.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mb-2">Cast</h2>
              <div className="flex flex-wrap">
                {movie.credits.cast.slice(0, 5).map((actor) => (
                  <Link
                    to={`/movies/actor/${actor.id}`}
                    key={actor.id}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2 hover:bg-gray-300 transition-colors"
                  >
                    {actor.name}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
