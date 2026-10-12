import { useEffect, useRef } from 'react';
import { Box, Button, CircularProgress, Grid, Skeleton, Typography } from '@mui/material';
import MovieCard from './MovieCard';
import ErrorMessage from '../common/ErrorMessage';


export default function MovieGrid({ movies, loading, error, onRetry, hasMore, infinite, onLoadMore, emptyText = 'No movies found.' }) {
  const sentinel = useRef(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!infinite || !hasMore || loading || error || !el) return undefined;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && onLoadMore(), { rootMargin: '300px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [infinite, hasMore, loading, error, onLoadMore]);

  return (
    <>
      <Grid container spacing={{ xs: 1.5, md: 2.5 }}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={6} sm={4} md={3} lg={2}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
        {loading && !movies.length &&
          Array.from({ length: 12 }).map((_, i) => (
            <Grid item key={i} xs={6} sm={4} md={3} lg={2}>
              <Skeleton variant="rounded" height={320} />
            </Grid>
          ))}
      </Grid>

      {error && <ErrorMessage message={error} onRetry={onRetry} />}

      {!loading && !error && !movies.length && (
        <Typography color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>{emptyText}</Typography>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', py: 3, minHeight: 48 }}>
        {loading && movies.length > 0 && <CircularProgress size={28} />}
        {!loading && !error && hasMore && movies.length > 0 &&
          (infinite ? <div ref={sentinel} /> : <Button variant="outlined" size="large" onClick={onLoadMore}>Load more</Button>)}
      </Box>
    </>
  );
}
