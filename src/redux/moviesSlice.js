import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = '87bd15aa50ee417514934166f5912288';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.results;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [], // Bu state'in tanımlandığından emin olun
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
