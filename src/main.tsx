import React from 'react';
import ReactDOM from 'react-dom/client';
import { Login } from './pages/login/Login';

const rootElement = document.createElement('div');

rootElement.className = 'root';
document.body.insertBefore(rootElement, document.body.firstChild);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
);
