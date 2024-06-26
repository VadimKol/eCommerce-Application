import '@/index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routerConfig } from '@/router/router-config';

document.body.classList.add('body');

const rootElement = document.createElement('div');

rootElement.className = 'root';
document.body.insertBefore(rootElement, document.body.firstChild);

const router = createBrowserRouter(routerConfig);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
