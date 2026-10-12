import { Typography } from '@mui/material';
import MovieGrid from '../components/movie/MovieGrid';
import { useMovieStore } from '../context/MovieContext';

export default function Favorites() {
  const { favorites } = useMovieStore();
  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>Your favorites</Typography>
      <MovieGrid
        movies={favorites}
        loading={false}
        error=""
        hasMore={false}
        infinite={false}
        emptyText="You have not saved any movies yet. Tap the heart on a movie to add it here."
      />
    </>
  );
}
