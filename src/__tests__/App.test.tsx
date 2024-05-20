import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { routerConfig } from '@/router/router-config.tsx';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', () => {
  const router = createMemoryRouter(routerConfig, {
    initialEntries: ['/'],
  });

  render(<RouterProvider router={router} />);
  expect(true).toBeTruthy();
});
