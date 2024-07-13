import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { ActionPaths } from '@/common/enums';
import { NavLink } from '@/components/nav-link/NavLink';

it('renders correctly', () => {
  const { container } = render(
    <BrowserRouter>
      <NavLink to={ActionPaths.CART} label="Items in cart:" icon="cart" />
    </BrowserRouter>,
  );

  expect(container).toMatchSnapshot();
});
