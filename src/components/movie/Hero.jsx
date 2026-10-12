import { useNavigate } from 'react-router-dom';
import { Box, Button, Chip, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { imageUrl } from '../../api/tmdb';


export default function Hero({ movie }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        mb: 4, minHeight: { xs: 280, md: 420 }, display: 'flex', alignItems: 'flex-end', color: '#fff',
        borderRadius: 4, overflow: 'hidden',
        backgroundSize: 'cover', backgroundPosition: 'center top',
        backgroundImage: `linear-gradient(90deg, rgba(13,17,28,.92) 0%, rgba(13,17,28,.35) 70%), url(${imageUrl(movie.backdrop_path, 'w1280')})`,
      }}
    >
      <Box sx={{ p: { xs: 2.5, md: 6 }, maxWidth: 620 }}>
        <Chip label="Most watched this week" color="primary" size="small" sx={{ mb: 2 }} />
        <Typography variant="h3" sx={{ fontSize: { xs: '1.8rem', md: '3rem' } }}>{movie.title}</Typography>
        <Typography sx={{ mt: 1.5, opacity: 0.88, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {movie.overview}
        </Typography>
        <Button variant="contained" size="large" startIcon={<PlayArrowIcon />} sx={{ mt: 3 }} onClick={() => navigate(`/movie/${movie.id}`)}>
          See details
        </Button>
      </Box>
    </Box>
  );
}
