import '@testing-library/jest-dom';

import type { RenderResult } from '@testing-library/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast } from 'react-toastify';

import { logout } from '@/api/client-actions';
import type { CategoriesContextType } from '@/common/types';
import { HeaderLinks } from '@/components/header/links/HeaderLinks';
import { useAuth } from '@/hooks/useAuth';
import { useCategories } from '@/hooks/useCategories';

jest.mock('@/hooks/useAuth');
jest.mock('@/api/client-actions');
jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

jest.mock('@/hooks/useCategories', () => ({
  useCategories: jest.fn(),
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockLogout = logout as jest.MockedFunction<typeof logout>;
const mockToast = toast as jest.MockedFunction<typeof toast>;
const mockUseCategories = useCategories as jest.MockedFunction<typeof useCategories>;

const setup = (
  authState = { isAuthenticated: false, handleLogout: jest.fn(), handleLogin: jest.fn() },
  categoriesState: CategoriesContextType = { error: null, categories: null, loading: false },
): RenderResult => {
  mockUseAuth.mockReturnValue(authState);
  mockUseCategories.mockReturnValue(categoriesState);
  return render(
    <Router>
      <HeaderLinks />
    </Router>,
  );
};

describe('HeaderLinks', () => {
  it('renders navigation links', () => {
    setup();
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('CATALOG')).toBeInTheDocument();
    expect(screen.getByText('ABOUT')).toBeInTheDocument();
  });

  it('renders login and register links when not authenticated', () => {
    setup();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('renders profile and logout links when authenticated', () => {
    setup({ isAuthenticated: true, handleLogout: jest.fn(), handleLogin: jest.fn() });
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls logout and shows toast on logout click', async () => {
    const handleLogout = jest.fn();
    setup({ isAuthenticated: true, handleLogout, handleLogin: jest.fn() });

    mockLogout.mockResolvedValueOnce();

    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(mockToast).toHaveBeenCalledWith('Successfully logged out', { type: 'success' });
      expect(handleLogout).toHaveBeenCalled();
    });
  });

  it('shows error toast on logout failure', async () => {
    setup({ isAuthenticated: true, handleLogout: jest.fn(), handleLogin: jest.fn() });

    mockLogout.mockRejectedValueOnce(new Error('Failed to logout'));

    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(mockToast).toHaveBeenCalledWith('Failed to logout', { type: 'error' });
    });
  });

  it('does not render categories list in burger menu when not on catalog path', () => {
    setup(
      { isAuthenticated: true, handleLogout: jest.fn(), handleLogin: jest.fn() },
      { error: null, categories: null, loading: false },
    );
    window.location.pathname = '/home';
    expect(screen.queryByText('Categories')).not.toBeInTheDocument();
  });
});
