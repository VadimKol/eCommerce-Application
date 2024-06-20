import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { MemoryRouter, Navigate } from 'react-router-dom';

import { ActionPaths } from '@/common/enums';
import { AuthRoute } from '@/components/auth-route/AuthRoute';
import { useAuth } from '@/hooks/useAuth';

jest.mock('@/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));
jest.mock('react-router-dom', () => {
  const actualModules = jest.requireActual<object>('react-router-dom');

  return {
    ...actualModules,
    Navigate: jest.fn(),
  };
});

describe('AuthRoute', () => {
  const mockUseAuth = useAuth as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('navigates to login when not authenticated', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });

    render(
      <MemoryRouter>
        <AuthRoute>
          <div>Protected Content</div>
        </AuthRoute>
      </MemoryRouter>,
    );

    expect(Navigate).toHaveBeenCalledWith({ to: ActionPaths.LOGIN, replace: true }, {});
  });

  test('renders children when authenticated', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true });

    const { getByText } = render(
      <MemoryRouter>
        <AuthRoute>
          <div>Protected Content</div>
        </AuthRoute>
      </MemoryRouter>,
    );

    expect(getByText('Protected Content')).toBeInTheDocument();
  });
});
