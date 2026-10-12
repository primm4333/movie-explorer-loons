import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);


export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('reelhouse_user', null);

  const login = (username, password) => {
    if (username.trim().length < 3 || password.length < 6) {
      throw new Error('Username needs at least 3 characters and password at least 6.');
    }
    setUser({ name: username.trim() });
  };
  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
