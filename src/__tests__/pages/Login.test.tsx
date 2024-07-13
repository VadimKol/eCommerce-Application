import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Login } from '@/pages/login/Login';
import { loginSchema } from '@/pages/login/login-schema';

describe('Testing login form', () => {
  test('Login test with good email and password', () => {
    expect(() => loginSchema.parse({ email: 'user@example.com', password: 'asdfasdfA1' })).not.toThrow();
  });

  test('Login test with invalid email and good password', () => {
    expect(() => loginSchema.parse({ email: 'user@examplecom', password: 'asdfasdfA1' })).toThrow();
  });

  test('Login test with good email and invalid password', () => {
    expect(() => loginSchema.parse({ email: 'user@example.com', password: 'asdfasdfA' })).toThrow();
  });

  test('Login test with invalid email and password', () => {
    expect(() => loginSchema.parse({ email: ' user@example.com ', password: 'asdfasdf1' })).toThrow();
  });

  it('renders correctly', () => {
    const { container } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
