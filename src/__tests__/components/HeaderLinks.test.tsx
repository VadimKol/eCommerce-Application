import '@testing-library/jest-dom';

import type { RenderResult } from '@testing-library/react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { logout } from '@/api/client-actions';
import { ActionPaths, NavigationPaths } from '@/common/enums';
import { HeaderLinks } from '@/components/header/links/HeaderLinks';
import { useAuth } from '@/hooks/useAuth';

jest.mock('@/api/client-actions', () => ({
  logout: jest.fn(),
}));
jest.mock('@/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));
jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));
jest.mock('./styles.module.scss', () => ({
  navigation: 'navigation',
  insideMenu: 'insideMenu',
  navList: 'navList',
  navLink: 'navLink',
  navLinkCurrent: 'navLinkCurrent',
  actionsList: 'actionsList',
  actionsItem: 'actionsItem',
  logoutButton: 'logoutButton',
  actionLink: 'actionLink',
  loginLink: 'loginLink',
  registerLink: 'registerLink',
}));

describe('HeaderLinks Component', () => {
  const mockUseAuth = useAuth as jest.Mock;

  const renderComponent = (
    isAuthenticated = false,
    initialRoute = '/',
  ): { component: RenderResult; handleLogout: jest.Mock } => {
    const handleLogout = jest.fn();

    mockUseAuth.mockReturnValue({
      isAuthenticated,
      handleLogout,
    });

    const component = render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <HeaderLinks />
      </MemoryRouter>,
    );

    return { component, handleLogout };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders navigation links correctly', () => {
    renderComponent();

    Object.keys(NavigationPaths).forEach((path) => {
      expect(screen.getByText(path)).toBeInTheDocument();
    });
  });

  test('renders login and register links when not authenticated', () => {
    renderComponent(false, '/');

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('does not render login and register links on respective pages', () => {
    renderComponent(false, ActionPaths.LOGIN);
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();

    cleanup();

    renderComponent(false, ActionPaths.REGISTER);
    expect(screen.queryByText('Register')).not.toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('renders logout button when authenticated', () => {
    renderComponent(true);

    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('calls logout and redirects on logout button click', async () => {
    const { handleLogout } = renderComponent(true, '/');

    (logout as jest.Mock).mockResolvedValueOnce({});
    const { getAllByText } = renderComponent(true, '/').component;

    fireEvent.click(getAllByText('Logout')[0] as HTMLButtonElement);

    await waitFor(() => expect(logout).toHaveBeenCalled());
    expect(toast).toHaveBeenCalledWith('Successfully logged out', { type: 'success' });
    expect(handleLogout).toHaveBeenCalled();
  });

  test('shows error toast on logout failure', async () => {
    const { handleLogout } = renderComponent(true, '/');

    (logout as jest.Mock).mockRejectedValueOnce(new Error('Logout failed'));
    const { getAllByText } = renderComponent(true, '/').component;

    fireEvent.click(getAllByText('Logout')[0] as HTMLButtonElement);

    await waitFor(() => expect(logout).toHaveBeenCalled());
    expect(toast).toHaveBeenCalledWith('Failed to logout', { type: 'error' });
    expect(handleLogout).not.toHaveBeenCalled();
  });
});
