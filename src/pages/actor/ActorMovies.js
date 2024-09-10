import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';
import Pagination from '../../components/Pagination';
import { fetchFilteredMovies } from '../../services/movieService';
import ReusableHeader from '../../components/ReusableHeader';
import cinemaImage from '../../assets/cinema.jpg';

const ActorMovies = () => {
  const { actorId } = useParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);

  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      const data = await fetchFilteredMovies({ with_cast: actorId }, currentPage);
      setMovies(data.results);
      setTotalMovies(data.total_results);
      setIsLoading(false);
    };

    getMovies();
  }, [actorId, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Boş grid hücreleri için placeholder eklemek için:
  const moviesPerPage = 24; // 6x4 grid
  const placeholders = [...Array(moviesPerPage - movies.length).keys()]; // Boş grid hücreleri için

  return (
    <div className="bg-gray-900 text-white font-ubuntu max-w-custom-max mx-auto">
      <ReusableHeader
        title="Movies with Actor"
        breadcrumb="Actor Movies"
        backgroundImage={cinemaImage}
      />

      <div className="container mx-auto px-side-padding py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {isLoading ? (
            [...Array(moviesPerPage)].map((_, index) => (
              <div key={index} className="block bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-[332px] bg-gray-700 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            ))
          ) : (
            <>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
              {placeholders.map((placeholder) => (
                <div key={placeholder} className="block bg-transparent rounded-lg"></div> // Boş yerleri dolduran grid hücreleri
              ))}
            </>
          )}
        </div>
        <div className="mt-12">
          <Pagination
            moviesPerPage={moviesPerPage}
            totalMovies={totalMovies}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ActorMovies;
