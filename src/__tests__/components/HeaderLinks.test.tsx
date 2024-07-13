import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { NavigationPaths } from '@/common/enums';
import type { AuthContextInterface, CategoriesContextType } from '@/common/types';
import { HeaderLinks } from '@/components/header/links/HeaderLinks';
import type { CartContextProps } from '@/contexts/cart-context';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useCategories } from '@/hooks/useCategories';

jest.mock('@/hooks/useAuth');
jest.mock('@/hooks/useCart');
jest.mock('@/hooks/useCategories');
jest.mock('@/api/cart');
jest.mock('@/api/client-actions');

jest.mock('@/components/nav-link/NavLink', () => ({
  NavLink: ({ to, label }: { to: string; label: string }): JSX.Element => <a href={to}>{label}</a>,
}));
jest.mock('@/components/categories-list/CategoriesList', () => ({
  CategoriesList: (): JSX.Element => <div>Categories List</div>,
}));

const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockedUseCart = useCart as jest.MockedFunction<typeof useCart>;
const mockedUseCategories = useCategories as jest.MockedFunction<typeof useCategories>;

describe('HeaderLinks', () => {
  beforeEach(() => {
    mockedUseAuth.mockReturnValue({
      isAuthenticated: false,
      handleLogout: jest.fn(),
      handleLogin: jest.fn(),
    } as AuthContextInterface);

    mockedUseCart.mockReturnValue({
      updateCart: jest.fn(),
      getCartItemsCount: () => 0,
      cart: [],
      isItemInCart: jest.fn(),
      getItemCount: jest.fn(),
      getLineItemId: jest.fn(),
    } as unknown as CartContextProps);

    mockedUseCategories.mockReturnValue({
      error: null,
      categories: [],
      loading: false,
    } as CategoriesContextType);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (isInsideBurgerMenu = false): void => {
    render(
      <BrowserRouter>
        <HeaderLinks isInsideBurgerMenu={isInsideBurgerMenu} />
      </BrowserRouter>,
    );
  };

  it('renders navigation links', () => {
    renderComponent();
    Object.keys(NavigationPaths).forEach((key) => {
      expect(screen.getByText(key)).toBeInTheDocument();
    });
  });

  it('shows login and register links when not authenticated', () => {
    renderComponent();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('shows logout and profile links when authenticated', () => {
    mockedUseAuth.mockReturnValueOnce({
      isAuthenticated: true,
      handleLogout: jest.fn(),
      handleLogin: jest.fn(),
    } as AuthContextInterface);

    renderComponent();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
