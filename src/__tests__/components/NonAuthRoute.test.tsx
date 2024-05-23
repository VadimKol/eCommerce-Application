import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { MemoryRouter, Navigate } from 'react-router-dom';

import { NavigationPaths } from '@/common/enums';
import { NonAuthRoute } from '@/components/non-auth-route/NonAuthRoute';
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

describe('NonAuthRoute', () => {
  const mockUseAuth = useAuth as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('navigates to home when authenticated', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter>
        <NonAuthRoute>
          <div>Protected Content</div>
        </NonAuthRoute>
      </MemoryRouter>,
    );

    expect(Navigate).toHaveBeenCalledWith({ to: NavigationPaths.HOME, replace: true }, {});
  });

  test('renders children when not authenticated', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });

    const { getByText } = render(
      <MemoryRouter>
        <NonAuthRoute>
          <div>Protected Content</div>
        </NonAuthRoute>
      </MemoryRouter>,
    );

    expect(getByText('Protected Content')).toBeInTheDocument();
  });
});
