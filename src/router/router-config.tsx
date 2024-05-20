import { App } from '@/App';
import { ActionPaths, NavigationPaths } from '@/common/enums';
import { NonAuthRoute } from '@/components/non-auth-route/NonAuthRoute';
import { About } from '@/pages/about/About';
import { Catalog } from '@/pages/catalog/Catalog';
import { ErrorPage } from '@/pages/error/ErrorPage';
import { Home } from '@/pages/home/Home';
import { Login } from '@/pages/login/Login';
import { NoMatch } from '@/pages/no-match/NoMatch';
import { Register } from '@/pages/register/Register';

export const routerConfig = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { path: NavigationPaths.HOME, element: <Home /> },
          { path: NavigationPaths.CATALOG, element: <Catalog /> },
          { path: NavigationPaths.ABOUT, element: <About /> },
          { path: '*', element: <NoMatch /> },
          {
            path: ActionPaths.LOGIN,
            element: (
              <NonAuthRoute>
                <Login />
              </NonAuthRoute>
            ),
          },
          {
            path: ActionPaths.REGISTER,
            element: (
              <NonAuthRoute>
                <Register />
              </NonAuthRoute>
            ),
          },
        ],
      },
    ],
  },
];
