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

    const newFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);

    // Filtrelerin tam içeriğini görmek için
    console.log("Updated Filters:", JSON.stringify(newFilters, null, 2));
  };

  const yearOptions = Array.from({ length: 2023 - 1900 + 1 }, (_, index) => 2023 - index);
  const ratingOptions = Array.from({ length: 11 }, (_, index) => index);

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Filters</h3>
      
      <div>
        <label className="block">Genres:</label>
        <select name="with_genres" value={filters.with_genres} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block">IMDb Score (Minimum):</label>
        <select
          name="vote_average_gte"
          value={filters.vote_average_gte}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Rating</option>
          {ratingOptions.map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block">Language:</label>
        <select
          name="with_original_language"
          value={filters.with_original_language}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">All Languages</option>
          {languages.map((lang) => (
            <option key={lang.iso_639_1} value={lang.iso_639_1}>
              {lang.english_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block">Year:</label>
        <select
          name="primary_release_year"
          value={filters.primary_release_year}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Year</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
