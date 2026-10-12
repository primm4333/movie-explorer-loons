import axios from 'axios';

//the API key is added to every request.
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 10000,
  params: { api_key: import.meta.env.VITE_TMDB_API_KEY, language: 'en-US' },
});

export const imageUrl = (path, size = 'w500') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

// Converts any axios error into a message.
export function getErrorMessage(err) {
  if (!err.response) {
    return err.code === 'ECONNABORTED'
      ? 'The request timed out. Please try again.'
      : 'Network error. Check your internet connection and try again.';
  }
  switch (err.response.status) {
    case 401: return 'The TMDb API key is missing or invalid. Check your .env file.';
    case 404: return 'We could not find what you were looking for.';
    case 429: return 'Too many requests. Wait a moment and try again.';
    default: return 'Something went wrong on the server. Please try again later.';
  }
}

export const getTrending = (page = 1) =>
  api.get('/trending/movie/week', { params: { page } }).then((r) => r.data);

export const searchMovies = (query, page = 1, year) =>
  api.get('/search/movie', { params: { query, page, primary_release_year: year || undefined } }).then((r) => r.data);

export const discoverMovies = ({ genre, year, rating, page = 1 }) =>
  api.get('/discover/movie', {
    params: {
      page,
      with_genres: genre || undefined,
      primary_release_year: year || undefined,
      'vote_average.gte': rating || undefined,
      'vote_count.gte': 50,
      sort_by: 'popularity.desc',
    },
  }).then((r) => r.data);

export const getGenres = () => api.get('/genre/movie/list').then((r) => r.data.genres);


export const getMovieDetails = (id) =>
  api.get(`/movie/${id}`, { params: { append_to_response: 'credits,videos' } }).then((r) => r.data);
