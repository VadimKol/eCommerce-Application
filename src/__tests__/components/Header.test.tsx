import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { NavigationPaths } from '@/common/enums';
import { Header } from '@/components/header/Header';

jest.mock('@/components/header/burger-menu/BurgerMenu', () => ({
  BurgerMenu: (): JSX.Element => <div data-testid="burger-menu">Burger Menu</div>,
}));
jest.mock('@/components/header/links/HeaderLinks', () => ({
  HeaderLinks: (): JSX.Element => <div data-testid="header-links">Header Links</div>,
}));

jest.mock('./styles.module.scss', () => ({
  header: 'header',
  container: 'container',
  wordmark: 'wordmark',
}));

describe('Header Component', () => {
  test('renders the Header component with all its elements', () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    // Check if the BurgerMenu component is rendered
    const burgerMenu = screen.getByTestId('burger-menu');
    expect(burgerMenu).toBeInTheDocument();

    // Check if the Link component with the wordmark is rendered
    const wordmarkLink = screen.getByText('Geek store');
    expect(wordmarkLink).toBeInTheDocument();
    expect(wordmarkLink).toHaveAttribute('href', NavigationPaths.HOME);

    // Check if the HeaderLinks component is rendered
    const headerLinks = screen.getByTestId('header-links');
    expect(headerLinks).toBeInTheDocument();
  });
});
