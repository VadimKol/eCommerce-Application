import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { About } from '@/pages/about/About';

it('renders correctly', () => {
  const { container } = render(
    <BrowserRouter>
      <About />
    </BrowserRouter>,
  );
  expect(container).toMatchSnapshot();
});
