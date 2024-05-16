import './main.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import appStyles from '@/pages/_app/styles.module.scss';

import { ActionPaths, NavigationPaths } from './common/enums';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { NonAuthRoute } from './components/non-auth-route/NonAuthRoute';
import { AuthProvider } from './contexts/auth-context';
import { App } from './pages/_app/App';
import { About } from './pages/about/About';
import { Catalog } from './pages/catalog/Catalog';
import { ErrorPage } from './pages/error/Error';
import { Home } from './pages/home/Home';
import { Login } from './pages/login/login';
import { NoMatch } from './pages/no-match/NoMatch';
import { Register } from './pages/register/Register';

document.body.classList.add('body');

const rootElement = document.createElement('div');

rootElement.className = 'root';
document.body.insertBefore(rootElement, document.body.firstChild);

export const routerConfig = [
  {
    path: '/',
    element: <App />,
    errorElement: (
      <>
        <Header appStyles={appStyles.header} />
        <ErrorPage />
        <Footer appStyles={appStyles.footer} />
      </>
    ),
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
];

const router = createBrowserRouter(routerConfig);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
