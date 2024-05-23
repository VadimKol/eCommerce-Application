import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { NoMatch } from '@/pages/no-match/NoMatch';

test('renders NoMatch component correctly', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <NoMatch />
    </MemoryRouter>,
  );

  expect(asFragment()).toMatchSnapshot();
});
