import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Cart } from '@/pages/cart/Cart';

it('renders correctly', () => {
  const { container } = render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>,
  );
  expect(container).toMatchSnapshot();
});
