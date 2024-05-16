import { createContext, useCallback, useMemo, useState } from 'react';

import type { AuthContextInterface } from '@/common/types';

export const AuthContext = createContext({
  isAuthenticated: false,
  handleLogin: () => {},
  handleLogout: () => {},
} as AuthContextInterface);

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const contextValue = useMemo(
    () => ({ isAuthenticated, handleLogin, handleLogout }),
    [isAuthenticated, handleLogout, handleLogin],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
