import { useNavigate } from 'react-router-dom';
import { Box, Card, CardActionArea, CardMedia, Chip, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import MovieIcon from '@mui/icons-material/Movie';
import { imageUrl } from '../../api/tmdb';
import { useMovieStore } from '../../context/MovieContext';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMovieStore();
  const favorite = isFavorite(movie.id);
  const poster = imageUrl(movie.poster_path);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'TBA';

  return (
    <Card sx={{ position: 'relative', height: '100%', transition: 'transform .2s', '&:hover': { transform: 'translateY(-4px)' } }}>
      <CardActionArea onClick={() => navigate(`/movie/${movie.id}`)}>
        {poster ? (
          <CardMedia component="img" image={poster} alt={movie.title} loading="lazy" sx={{ aspectRatio: '2 / 3', objectFit: 'cover' }} />
        ) : (
          <Box sx={{ aspectRatio: '2 / 3', display: 'grid', placeItems: 'center', bgcolor: 'action.hover' }}>
            <MovieIcon fontSize="large" color="disabled" />
          </Box>
        )}
        <Box sx={{ p: 1.5 }}>
          <Typography variant="subtitle2" fontWeight={700} noWrap>{movie.title}</Typography>
          <Typography variant="caption" color="text.secondary">{year}</Typography>
        </Box>
      </CardActionArea>

      <Chip
        size="small"
        icon={<StarIcon />}
        label={Number(movie.vote_average || 0).toFixed(1)}
        sx={{ position: 'absolute', top: 8, left: 8, color: '#fff', bgcolor: 'rgba(0,0,0,.72)', '& .MuiChip-icon': { color: '#F2A20C' } }}
      />
      <IconButton
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        onClick={() => toggleFavorite(movie)}
        sx={{ position: 'absolute', top: 4, right: 4, color: favorite ? '#ff5c7a' : '#fff', bgcolor: 'rgba(0,0,0,.55)', '&:hover': { bgcolor: 'rgba(0,0,0,.8)' } }}
      >
        {favorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
      </IconButton>
    </Card>
  );
}
