import '@testing-library/jest-dom';

import type { RenderResult } from '@testing-library/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import { BurgerMenu } from '@/components/header/burger-menu/BurgerMenu';

jest.mock('react-burger-menu', () => ({
  slide: jest.fn(
    ({
      isOpen,
      onStateChange,
      children,
    }: {
      isOpen: boolean;
      onStateChange: (state: { isOpen: boolean }) => void;
      children: React.ReactNode;
    }) => (
      <div>
        <button data-testid="burger-button" onClick={() => onStateChange({ isOpen: !isOpen })}>
          Toggle Menu
        </button>
        {isOpen && <div data-testid="menu-content">{children}</div>}
      </div>
    ),
  ),
}));

jest.mock('@/components/header/links/HeaderLinks', () => ({
  HeaderLinks: jest.fn(() => (
    <div>
      <Link to="/test">Test Page</Link>
    </div>
  )),
}));

describe('BurgerMenu', () => {
  function TestComponent(): JSX.Element {
    return (
      <div>
        <BurgerMenu />
      </div>
    );
  }

  const renderWithRouter = (initialRoute = '/'): RenderResult => {
    window.history.pushState({}, 'Test page', initialRoute);

    return render(
      <Router>
        <Routes>
          <Route path="/" element={<TestComponent />} />
          <Route path="/test" element={<div>Test Page</div>} />
        </Routes>
      </Router>,
    );
  };

  it('closes the menu when the location changes', async () => {
    renderWithRouter();

    fireEvent.click(screen.getByTestId('burger-button'));

    expect(screen.getByTestId('menu-content')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Test Page'));

    await waitFor(() => {
      expect(screen.queryByTestId('menu-content')).not.toBeInTheDocument();
    });
  });

  it('handles menu open and close', () => {
    renderWithRouter();

    const button = screen.getByTestId('burger-button');

    expect(screen.queryByTestId('menu-content')).not.toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByTestId('menu-content')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByTestId('menu-content')).not.toBeInTheDocument();
  });
});
