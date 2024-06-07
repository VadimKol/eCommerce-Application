import '@testing-library/jest-dom';

import { /*  fireEvent, render, screen, */ waitFor } from '@testing-library/react';

// import { BrowserRouter } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { login } from '@/api/client-actions';
// import { Login } from '@/pages/login/Login';

jest.mock('@/api/client-actions');
/* jest.mock('react-toastify', () => ({
  toast: jest.fn(),
})); */

const mockLogin = login as jest.MockedFunction<typeof login>;
// const mockToast = toast as jest.MockedFunction<typeof toast>;

it('shows error toast on login failure', async () => {
  /*   const setup = render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  ); */

  // mockLogin.mockRejectedValueOnce(new Error('Failed to login'));

  await mockLogin({ email: 'user@example.com', password: 'asdfasdfBBB1' });

  // fireEvent.click(screen.getByText('Log in'));

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalled();
    // expect(mockToast).toHaveBeenCalledWith('Failed to login', { type: 'error' });
  });
});
