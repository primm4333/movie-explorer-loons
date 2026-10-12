import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const MovieContext = createContext(null);
export const useMovieStore = () => useContext(MovieContext);


export function MovieProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('reelhouse_favorites', []);
  const [lastSearch, setLastSearch] = useLocalStorage('reelhouse_last_search', '');

  const isFavorite = (id) => favorites.some((m) => m.id === id);

  const toggleFavorite = (movie) =>
    setFavorites((list) =>
      list.some((m) => m.id === movie.id)
        ? list.filter((m) => m.id !== movie.id)
        : [...list, {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
          }]
    );

  return (
    <MovieContext.Provider value={{ favorites, isFavorite, toggleFavorite, lastSearch, setLastSearch }}>
      {children}
    </MovieContext.Provider>
  );
}
