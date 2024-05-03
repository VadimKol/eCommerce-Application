import React from 'react';
import ReactDOM from 'react-dom/client';

const rootElement = document.createElement('div');

rootElement.className = 'root';
document.body.insertBefore(rootElement, document.body.firstChild);

ReactDOM.createRoot(rootElement).render(<React.StrictMode />);
