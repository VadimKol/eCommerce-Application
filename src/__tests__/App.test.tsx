import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { App } from '@/App';

jest.mock('@/components/footer/Footer.tsx', () => ({
  Footer: (): JSX.Element => <div data-testid="footer">Footer</div>,
}));

jest.mock('@/components/header/Header.tsx', () => ({
  Header: (): JSX.Element => <div data-testid="header">Header</div>,
}));

jest.mock('@/components/toast/Toast.tsx', () => ({
  Toast: (): JSX.Element => <div data-testid="toast">Toast</div>,
}));

test('renders the App component with Header, Outlet, Footer, and Toast', () => {
  const routerConfig = [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <div data-testid="outlet">Main Content</div>,
        },
      ],
    },
  ];

  const router = createMemoryRouter(routerConfig, {
    initialEntries: ['/'],
  });

  render(<RouterProvider router={router} />);

  expect(screen.getByTestId('header')).toBeInTheDocument();
  expect(screen.getByTestId('footer')).toBeInTheDocument();
  expect(screen.getByTestId('toast')).toBeInTheDocument();
  expect(screen.getByTestId('outlet')).toBeInTheDocument();
});
