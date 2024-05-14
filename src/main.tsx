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
import { NoMatch } from './pages/no-match/No-match';
import { ErrorPage } from './pages/error/Error';
import { LoginProvider } from './contexts/login-context';

const rootElement = document.createElement('div');

rootElement.className = 'root';
document.body.insertBefore(rootElement, document.body.firstChild);

const router = createBrowserRouter([
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
]);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  </React.StrictMode>,
);
