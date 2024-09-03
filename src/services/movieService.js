import axios from 'axios';

const API_KEY = '87bd15aa50ee417514934166f5912288';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        page,
      },
    });
    return {
      results: response.data.results,
      total_results: response.data.total_results,
    };
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return { results: [], total_results: 0 };
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        page,
      },
    });

    const filteredResults = response.data.results.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase())
    );

    return {
      results: filteredResults,
      total_results: filteredResults.length,
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    return { results: [], total_results: 0 };
  }
};

export const fetchFilteredMovies = async (filters, page = 1) => {
  try {
    const processedFilters = {
      ...filters,
      vote_average_gte: Number(filters.vote_average_gte),
    };

    console.log("Applying Filters to API:", JSON.stringify(processedFilters, null, 2));

    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        ...processedFilters,
        page,
      },
    });

    console.log("API Response:", JSON.stringify(response.data, null, 2));

    return {
      results: response.data.results,
      total_results: response.data.total_results,
    };
  } catch (error) {
    console.error('Error fetching all filtered movies:', error);
    return { results: [], total_results: 0 };
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};

export const fetchLanguages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/configuration/languages`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching languages:', error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        append_to_response: 'credits',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    return null;
  }
};

export const fetchTrendingMovie = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
      params: {
        api_key: API_KEY,
      },
    });

    const trendingMovie = response.data.results[0]; // İlk trend olan filmi alıyor
    return trendingMovie;
  } catch (error) {
    console.error('Error fetching trending movie:', error);
    return null;
  }
};

export const fetchMoviesByGenre = async (genreId, limit = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
        sort_by: 'popularity.desc',
        page: 1,
      },
    });

    return {
      results: response.data.results.slice(0, limit), // İlk limit kadar film çekiliyor
    };
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return { results: [] };
  }
};
