import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { useContext } from 'react';

import { AuthContext, AuthProvider } from '@/contexts/auth-context';

describe('AuthProvider Component', () => {
  it('provides AuthContext with updated values after handleLogin', () => {
    function TestComponent(): JSX.Element {
      const { isAuthenticated, handleLogin, handleLogout } = useContext(AuthContext);
      return (
        <>
          <span data-testid="is-authenticated">Is Authenticated: {isAuthenticated.toString()}</span>
          <button onClick={handleLogin} data-testid="login-button">
            Login
          </button>
          <button onClick={handleLogout} data-testid="logout-button">
            Logout
          </button>
        </>
      );
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('Is Authenticated: false');

    fireEvent.click(screen.getByTestId('login-button'));

    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('Is Authenticated: true');
  });
});
