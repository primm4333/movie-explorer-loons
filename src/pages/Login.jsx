import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(username, password);
      navigate(location.state?.from || '/', { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2,
        backgroundImage: (t) => `radial-gradient(circle at 15% 20%, ${t.palette.primary.main}33, transparent 45%), radial-gradient(circle at 85% 80%, ${t.palette.secondary.main}33, transparent 45%)`,
      }}
    >
      <Paper component="form" onSubmit={handleSubmit} sx={{ p: { xs: 3, sm: 5 }, width: '100%', maxWidth: 420, display: 'grid', gap: 2.5 }}>
        <Box>
          <MovieFilterIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h4">Welcome to Reelhouse</Typography>
          <Typography color="text.secondary">Sign in to search, save and explore movies.</Typography>
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus autoComplete="username" required />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="Show or hide password" onClick={() => setShowPassword((s) => !s)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" size="large">Sign in</Button>
        <Typography variant="caption" color="text.secondary">Demo login: use any username (3+ characters) and password (6+ characters).</Typography>
      </Paper>
    </Box>
  );
}
