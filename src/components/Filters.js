import React, { useState, useEffect } from 'react';
import { fetchLanguages, fetchGenres } from '../services/movieService';

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    with_genres: '',
    vote_average_gte: '',
    with_original_language: '',
    primary_release_year: ''
  });

  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getLanguagesAndGenres = async () => {
      try {
        const languagesData = await fetchLanguages();
        setLanguages(languagesData);

        const genresData = await fetchGenres();
        setGenres(genresData);
      } catch (error) {
        console.error('Error fetching languages or genres:', error);
      }
    };

    getLanguagesAndGenres();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleApply = () => {
    onFilterChange(filters);
  };

  const yearOptions = Array.from({ length: 2023 - 1900 + 1 }, (_, index) => 2023 - index);
  const ratingOptions = Array.from({ length: 11 }, (_, index) => index);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div>
        <label className="block text-white font-bold mb-1">Genres:</label>
        <select name="with_genres" value={filters.with_genres} onChange={handleChange} className="w-full p-2 border border-gray-700 bg-gray-800 rounded-lg text-white">
          <option value="">All genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-white font-bold mb-1">IMDb Score (Minimum):</label>
        <select
          name="vote_average_gte"
          value={filters.vote_average_gte}
          onChange={handleChange}
          className="w-full p-2 border border-gray-700 bg-gray-800 rounded-lg text-white"
        >
          <option value="">Any rating</option>
          {ratingOptions.map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-white font-bold mb-1">Language:</label>
        <select
          name="with_original_language"
          value={filters.with_original_language}
          onChange={handleChange}
          className="w-full p-2 border border-gray-700 bg-gray-800 rounded-lg text-white"
        >
          <option value="">Any quality</option>
          {languages.map((lang) => (
            <option key={lang.iso_639_1} value={lang.iso_639_1}>
              {lang.english_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-white font-bold mb-1">Year:</label>
        <select
          name="primary_release_year"
          value={filters.primary_release_year}
          onChange={handleChange}
          className="w-full p-2 border border-gray-700 bg-gray-800 rounded-lg text-white"
        >
          <option value="">Relevance</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-4 text-right">
        <button onClick={handleApply} className="bg-pink-600 text-white px-6 py-2 rounded-lg transition-all duration-500 hover:brightness-125 hover:shadow-lg">
          APPLY
        </button>
      </div>
    </div>
  );
};

export default Filters;
