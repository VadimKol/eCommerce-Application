import { Navigate } from 'react-router-dom';

import { NavigationPaths } from '@/common/enums';
import { useAuth } from '@/hooks/useAuth';

export function NonAuthRoute({ children }: { children: JSX.Element }): JSX.Element {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={NavigationPaths.HOME} replace />;
  }

  return children;
}
