import { Link as RouterLink, NavLink } from 'react-router-dom';
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Tooltip, Typography, alpha } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import HomeIcon from '@mui/icons-material/HomeRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { useThemeMode } from '../../context/ThemeModeContext';
import { useAuth } from '../../context/AuthContext';
import { useMovieStore } from '../../context/MovieContext';

const navSx = { color: 'text.secondary', '&.active': { color: 'primary.main', bgcolor: (t) => alpha(t.palette.primary.main, 0.12) } };

export default function Navbar() {
  const { mode, toggle } = useThemeMode();
  const { user, logout } = useAuth();
  const { favorites } = useMovieStore();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        color: 'text.primary',
        backdropFilter: 'blur(14px)',
        bgcolor: (t) => alpha(t.palette.background.default, 0.8),
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ gap: 0.5 }}>
        <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit', mr: 'auto' }}>
          <MovieFilterIcon color="primary" />
          <Typography variant="h6" fontWeight={800}>Reelhouse</Typography>
        </Box>

        <Button component={NavLink} to="/" end startIcon={<HomeIcon />} sx={navSx}>Home</Button>
        <Button
          component={NavLink}
          to="/favorites"
          startIcon={<Badge badgeContent={favorites.length} color="secondary" max={99}><FavoriteIcon /></Badge>}
          sx={navSx}
        >
          Favorites
        </Button>

        <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          <IconButton onClick={toggle} aria-label="Toggle light and dark mode">
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title={`Sign out ${user?.name ?? ''}`}>
          <IconButton onClick={logout} aria-label="Sign out"><LogoutIcon /></IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
