import { render } from '@testing-library/react';
import React from 'react';

import { Search } from '@/components/search/Search';

it('renders correctly', () => {
  const someDispatch = (): void => {};
  const searchField: React.RefObject<HTMLInputElement> = { current: document.createElement('input') };
  const useRef = jest.fn().mockImplementation(() => searchField);
  jest.spyOn(React, 'useRef').mockImplementation(useRef);
  const { container } = render(<Search searchField={searchField} dispatch={someDispatch} />);

  expect(container).toMatchSnapshot();
});
