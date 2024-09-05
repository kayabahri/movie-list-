import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import Filter from '../components/Filters';
import ReusableHeader from '../components/ReusableHeader';
import { fetchPopularMovies } from '../services/movieService';
import cinemaImage from '../assets/cinema.jpg';

const Catalog = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchPopularMovies(currentPage);
      setMovies(data.results);
      setTotalPages(Math.ceil(data.total_results / 12)); // 12 film gösterilecek şekilde ayarlandı
    };

    loadMovies();
  }, [currentPage]);

  return (
    <div className="bg-gray-900 text-white font-ubuntu max-w-custom-max mx-auto">
      <ReusableHeader
        title="Catalog"
        breadcrumb="Catalog"
        backgroundImage={cinemaImage}
      />
      <div className="container mx-auto px-side-padding py-16">
        <div className="mb-8">
          <Filter />
        </div>
        {/* Kartlar arasındaki boşluğu kontrol etmek için sadece gap ayarını bıraktım */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
