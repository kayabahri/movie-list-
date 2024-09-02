import axios from 'axios';

const API_KEY = '87bd15aa50ee417514934166f5912288';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export default api;
