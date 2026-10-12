import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#F2A20C', contrastText: '#1b1204' }, // projector amber
      secondary: { main: '#6C7BFF' },
      background:
        mode === 'dark'
          ? { default: '#0d111c', paper: '#161c2c' }
          : { default: '#f2f4f9', paper: '#ffffff' },
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: '"Sora", system-ui, sans-serif',
      h3: { fontWeight: 800, letterSpacing: '-0.02em' },
      h4: { fontWeight: 800, letterSpacing: '-0.01em' },
      h5: { fontWeight: 700 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
  });
