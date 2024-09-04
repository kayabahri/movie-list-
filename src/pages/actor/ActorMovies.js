import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFilteredMovies } from '../../services/movieService';
import Skeleton from '../../components/Skeleton';
import ReactLoadingSkeleton from 'react-loading-skeleton';

const ActorMovies = () => {
  const { actorId } = useParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchFilteredMovies({ with_cast: actorId });
      setMovies(data.results);
      setIsLoading(false);
    };

    getMovies();
  }, [actorId]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Movies with this Actor</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          [...Array(8)].map((_, index) => (
            <div key={index} className="block bg-white rounded-lg shadow-lg overflow-hidden">
              <ReactLoadingSkeleton height={288} />
              <div className="p-4">
                <ReactLoadingSkeleton width="70%" height={20} />
                <ReactLoadingSkeleton width="50%" height={20} />
              </div>
            </div>
          ))
        ) : (
          movies.map((movie) => (
            <Skeleton key={movie.id} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default ActorMovies;
