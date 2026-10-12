import { createContext, useContext, useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import useLocalStorage from '../hooks/useLocalStorage';
import { getTheme } from '../theme/theme';

const ThemeModeContext = createContext(null);
export const useThemeMode = () => useContext(ThemeModeContext);

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useLocalStorage('reelhouse_mode', 'dark');
  const theme = useMemo(() => getTheme(mode), [mode]);
  const toggle = () => setMode((m) => (m === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeModeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
