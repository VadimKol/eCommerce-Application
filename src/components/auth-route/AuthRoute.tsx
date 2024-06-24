import { Navigate } from 'react-router-dom';

import { ActionPaths } from '@/common/enums';
import { useAuth } from '@/hooks/useAuth';

export function AuthRoute({ children }: { children: JSX.Element }): JSX.Element {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ActionPaths.LOGIN} replace />;
  }

  return children;
}
