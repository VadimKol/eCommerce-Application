import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { apiRoot, RefreshTokenFlow } from '@/api/build-client';
import type { AuthContextInterface } from '@/common/types';
import { broadcastChannel } from '@/common/utils';

export const AuthContext = createContext({
  isAuthenticated: false,
  handleLogin: () => {},
  handleLogout: () => {},
} as AuthContextInterface);

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('geek-shop-auth') !== null);

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

  useEffect(() => {
    const handleAuth = (e: MessageEvent<{ type: string }>): void => {
      if (e.data.type === 'Auth') {
        if (!isAuthenticated) {
          handleLogin();
        } else {
          handleLogout();
        }
      }
      if (e.data.type === 'Password' || e.data.type === 'Auth') {
        Object.assign(apiRoot, RefreshTokenFlow(localStorage.getItem('geek-shop-refresh') || ''));
      }
    };
    broadcastChannel.addEventListener('message', handleAuth);
    return (): void => {
      broadcastChannel.removeEventListener('message', handleAuth);
    };
  }, [isAuthenticated, handleLogin, handleLogout]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
