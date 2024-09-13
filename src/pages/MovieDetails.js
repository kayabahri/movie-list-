import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails } from '../services/movieService';
import Comments from '../components/Comments'; 

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [genres, setGenres] = useState({});

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);

      const genresMap = {};
      data.genres.forEach((genre) => {
        genresMap[genre.id] = genre.name;
      });
      setGenres(genresMap);
    };

    getMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  // Film süresi, ülke ve tarih bilgilerini kullanmak için
  const runtime = movie.runtime ? `${movie.runtime} min` : 'Unknown';
  const country = movie.production_countries?.[0]?.name || 'Unknown';
  const releaseDate = movie.release_date || 'Unknown';  // Tarih ekleme

  const backgroundStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.7)',
    width: '100vw',
    minHeight: '100vh',
    margin: '0',
    padding: '0',
  };

  return (
    <div className="relative min-h-screen" style={backgroundStyle}>
      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row space-y-4 md:space-y-0">
        {/* Sol kısım - Film Kartı */}
        <div className="md:w-1/3 flex justify-center">
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg shadow-lg w-full h-[450px] object-cover"
            />
          </div>
        </div>

        {/* Sağ kısım Film Detayları */}
        <div className="md:w-2/3 text-white px-4">
          <h1 className="text-3xl font-bold mb-4 font-ubuntu text-left">{movie.title}</h1>

          {/* Puan, Süre, Ülke ve Tarih Bilgileri */}
          <div className="text-left space-y-2 mb-6"> 
            <p>
              <span className="text-pink-500 font-bold">Rating: </span>
              <span className="text-white">{movie.vote_average.toFixed(2)}</span>
            </p>
            <p>
              <span className="text-pink-500 font-bold">Running time: </span>
              <span className="text-white">{runtime}</span>
            </p>
            <p>
              <span className="text-pink-500 font-bold">Country: </span>
              <span className="text-white">{country}</span>
            </p>
            <p>
              <span className="text-pink-500 font-bold">Premiere: </span>
              <span className="text-white">{releaseDate}</span>
            </p>
          </div>

          <p className="text-gray-300 mb-6 text-left">{movie.overview}</p>

          {/* Genres */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-left">Genres</h2>
            <div className="flex flex-wrap">
              {movie.genres.map((genre) => (
                <Link
                  to={`/movies/genre/${genre.id}`}
                  key={genre.id}
                  className="bg-pink-600 text-white px-3 py-1 rounded-full mr-2 mb-2 hover:bg-pink-800 transition-colors"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Cast */}
          {movie.credits && movie.credits.cast && movie.credits.cast.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 text-left">Cast</h2>
              <div className="flex flex-wrap">
                {movie.credits.cast.slice(0, 5).map((actor) => (
                  <Link
                    to={`/movies/actor/${actor.id}`}
                    key={actor.id}
                    className="bg-gray-700 text-white px-3 py-1 rounded-full mr-2 mb-2 hover:bg-gray-800 transition-colors"
                  >
                    {actor.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Alt Gradient Çizgisi */}
      <div className="absolute left-0 right-0 border-t border-pink-500"></div>

      {/* Yorumlar Bileşeni - Gradient çizgisinin altında */}
      <div className="container mx-auto px-6 py-12 bg-gray-900 mt-20">
        <Comments movieId={id} />
      </div>
    </div>
  );
};

export default MovieDetails;
