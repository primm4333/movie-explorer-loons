import { useCallback, useEffect, useRef, useState } from 'react';
import { discoverMovies, getErrorMessage, getTrending, searchMovies } from '../api/tmdb';


export default function useMovieFeed(query, filters) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const requestId = useRef(0); 

  const key = JSON.stringify([query, filters]);

  const load = useCallback(async (p, reset = false) => {
    const id = ++requestId.current;
    setLoading(true);
    setError('');
    if (reset) setMovies([]);
    try {
      let data;
      if (query) data = await searchMovies(query, p, filters.year);
      else if (filters.genre || filters.year || filters.rating) data = await discoverMovies({ ...filters, page: p });
      else data = await getTrending(p);
      if (id !== requestId.current) return;

      let results = data.results;
      if (query) {
        // the search endpoint has no genre/rating filter, so apply them here
        results = results.filter(
          (m) =>
            (!filters.genre || m.genre_ids.includes(Number(filters.genre))) &&
            (!filters.rating || m.vote_average >= Number(filters.rating))
        );
      }
      setMovies((prev) => (reset ? results : [...prev, ...results.filter((r) => !prev.some((x) => x.id === r.id))]));
      setPage(p);
      setTotalPages(Math.min(data.total_pages, 500)); // TMDb allows max 500 pages
    } catch (err) {
      if (id === requestId.current) setError(getErrorMessage(err));
    } finally {
      if (id === requestId.current) setLoading(false);
    }
    
  }, [key]);

  useEffect(() => { load(1, true); }, [load]);

  const loadMore = useCallback(() => {
    if (!loading && page < totalPages) load(page + 1);
  }, [loading, page, totalPages, load]);

  const retry = () => (movies.length ? load(page + 1) : load(1, true));

  return { movies, loading, error, hasMore: page < totalPages, loadMore, retry };
}
