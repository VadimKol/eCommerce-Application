import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { Header } from './components/header/Header';
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { Catalog } from './pages/catalog/Catalog';
import { About } from './pages/about/About';
import { NoMatch } from './pages/no-match/NoMatch';
import { ErrorPage } from './pages/error/Error';
import { LoginProvider } from './contexts/login-context';
import './style/index.scss';

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
        <Header />,
        <ErrorPage />
      </>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/catalog', element: <Catalog /> },
      { path: '/about', element: <About /> },
      { path: '*', element: <NoMatch /> },
    ],
  },
];

const router = createBrowserRouter(routerConfig);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  </React.StrictMode>,
);
