import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Box, Button, Chip, Grid, Skeleton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import ErrorMessage from '../components/common/ErrorMessage';
import TrailerDialog from '../components/movie/TrailerDialog';
import { getErrorMessage, getMovieDetails, imageUrl } from '../api/tmdb';
import { useMovieStore } from '../context/MovieContext';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMovieStore();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [trailerOpen, setTrailerOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setMovie(null);
    setError('');
    getMovieDetails(id)
      .then((data) => !cancelled && setMovie(data))
      .catch((err) => !cancelled && setError(getErrorMessage(err)));
    return () => { cancelled = true; };
  }, [id, attempt]);

  const back = <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>;

  if (error) return <>{back}<ErrorMessage message={error} onRetry={() => setAttempt((a) => a + 1)} /></>;
  if (!movie) return <>{back}<Skeleton variant="rounded" height={420} /></>;

  const videos = movie.videos?.results ?? [];
  const trailer = videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer') || videos.find((v) => v.site === 'YouTube');
  const cast = (movie.credits?.cast ?? []).slice(0, 10);
  const favorite = isFavorite(movie.id);
  const year = movie.release_date?.slice(0, 4);
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null;

  return (
    <>
      {back}
      <Box
        sx={{
          borderRadius: 4, overflow: 'hidden', p: { xs: 2.5, md: 5 }, color: '#fff',
          backgroundSize: 'cover', backgroundPosition: 'center',
          backgroundImage: `linear-gradient(rgba(13,17,28,.88), rgba(13,17,28,.88)), url(${imageUrl(movie.backdrop_path, 'w1280')})`,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={3.5}>
            <Box
              component="img"
              src={imageUrl(movie.poster_path, 'w500') || undefined}
              alt={movie.title}
              sx={{ width: '100%', maxWidth: 320, borderRadius: 3, display: 'block', mx: { xs: 'auto', md: 0 }, bgcolor: 'rgba(255,255,255,.08)', aspectRatio: '2 / 3', objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} md={8.5}>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.9rem', md: '2.8rem' } }}>
              {movie.title} {year && <Typography component="span" variant="h5" sx={{ opacity: 0.7 }}>({year})</Typography>}
            </Typography>
            {movie.tagline && <Typography sx={{ mt: 1, fontStyle: 'italic', opacity: 0.8 }}>{movie.tagline}</Typography>}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, my: 2 }}>
              <Chip icon={<StarIcon />} label={`${Number(movie.vote_average || 0).toFixed(1)} / 10`} sx={{ bgcolor: 'rgba(255,255,255,.14)', color: '#fff', '& .MuiChip-icon': { color: '#F2A20C' } }} />
              {runtime && <Chip label={runtime} variant="outlined" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.4)' }} />}
              {movie.genres.map((g) => <Chip key={g.id} label={g.name} color="primary" variant="outlined" />)}
            </Box>

            <Typography variant="h6" sx={{ mt: 3 }}>Overview</Typography>
            <Typography sx={{ maxWidth: 760, lineHeight: 1.8, opacity: 0.92 }}>{movie.overview || 'No overview available.'}</Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3 }}>
              {trailer && <Button variant="contained" startIcon={<PlayArrowIcon />} onClick={() => setTrailerOpen(true)}>Watch trailer</Button>}
              <Button variant="outlined" color="inherit" startIcon={favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />} onClick={() => toggleFavorite(movie)}>
                {favorite ? 'Remove from favorites' : 'Add to favorites'}
              </Button>
            </Box>

            {cast.length > 0 && (
              <>
                <Typography variant="h6" sx={{ mt: 4, mb: 1.5 }}>Cast</Typography>
                <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
                  {cast.map((c) => (
                    <Box key={c.id} sx={{ textAlign: 'center', width: 84, flexShrink: 0 }}>
                      <Avatar src={imageUrl(c.profile_path, 'w185')} alt={c.name} sx={{ width: 64, height: 64, mx: 'auto', mb: 0.5 }} />
                      <Typography variant="caption" sx={{ display: 'block', lineHeight: 1.3 }}>{c.name}</Typography>
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
      {trailer && <TrailerDialog open={trailerOpen} onClose={() => setTrailerOpen(false)} videoKey={trailer.key} title={movie.title} />}
    </>
  );
}
