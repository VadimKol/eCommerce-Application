import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Profile } from '@/pages/profile/Profile';

it('renders correctly', () => {
  const { container } = render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>,
  );
  expect(container).toMatchSnapshot();
});
