import { useEffect, useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import Hero from '../components/movie/Hero';
import SearchBar from '../components/movie/SearchBar';
import FilterBar from '../components/movie/FilterBar';
import MovieGrid from '../components/movie/MovieGrid';
import useDebounce from '../hooks/useDebounce';
import useMovieFeed from '../hooks/useMovieFeed';
import { getGenres } from '../api/tmdb';
import { useMovieStore } from '../context/MovieContext';

export default function Home() {
  const { lastSearch, setLastSearch } = useMovieStore();
  const [input, setInput] = useState('');
  const [filters, setFilters] = useState({ genre: '', year: '', rating: '' });
  const [genres, setGenres] = useState([]);

  const query = useDebounce(input.trim(), 500); // wait until the user stops typing
  const feed = useMovieFeed(query, filters);

  const filtersActive = Object.values(filters).some(Boolean);
  const hero = !query && !filtersActive ? feed.movies[0] : null;
  const heading = query ? `Results for "${query}"` : filtersActive ? 'Filtered movies' : 'Trending this week';

  useEffect(() => { getGenres().then(setGenres).catch(() => {}); }, []); 
  useEffect(() => { if (query) setLastSearch(query); }, [query, setLastSearch]);

  return (
    <>
      {hero && <Hero movie={hero} />}

      <Box sx={{ display: 'grid', gap: 2, mb: 4 }}>
        <SearchBar value={input} onChange={setInput} />
        <FilterBar filters={filters} genres={genres} onChange={setFilters} />
        {!input && lastSearch && (
          <Box>
            <Chip icon={<HistoryIcon />} label={`Pick up where you left off: ${lastSearch}`} onClick={() => setInput(lastSearch)} variant="outlined" />
          </Box>
        )}
      </Box>

      <Typography variant="h5" sx={{ mb: 2 }}>{heading}</Typography>
      <MovieGrid
        movies={feed.movies}
        loading={feed.loading}
        error={feed.error}
        onRetry={feed.retry}
        hasMore={feed.hasMore}
        infinite={Boolean(query)}
        onLoadMore={feed.loadMore}
        emptyText="No movies match your search. Try another title or clear the filters."
      />
    </>
  );
}
