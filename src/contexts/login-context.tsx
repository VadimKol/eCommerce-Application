import { createContext, useCallback, useMemo, useState } from 'react';

export interface LoginContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
}

export const LoginContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  handleLogout: () => {},
} as LoginContextInterface);

export function LoginProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const contextValue = useMemo(
    () => ({ isAuthenticated, setIsAuthenticated, handleLogout }),
    [isAuthenticated, handleLogout],
  );

  return <LoginContext.Provider value={contextValue}>{children}</LoginContext.Provider>;
}
