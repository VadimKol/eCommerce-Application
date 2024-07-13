import { render } from '@testing-library/react';
import React from 'react';

import { Pagination } from '@/components/pagination/Pagination';

it('renders correctly', () => {
  const someDispatch = (): void => {};
  const total: React.MutableRefObject<number> = { current: 0 };
  const useRef = jest.fn().mockImplementation(() => [total]);
  jest.spyOn(React, 'useRef').mockImplementation(useRef);

  const { container } = render(<Pagination page={0} dispatch={someDispatch} total={total} />);

  expect(container).toMatchSnapshot();
});
