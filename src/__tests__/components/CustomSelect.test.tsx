import { render } from '@testing-library/react';
import React from 'react';

import { sortingTypes } from '@/common/utils';
import { CustomSelect } from '@/components/custom-select/CustomSelect';

it('renders correctly', () => {
  let someValue = 'Sort';
  const someDispatch = (): void => {};
  const useReducer = jest.fn().mockImplementation(() => [someValue, someDispatch]);
  jest.spyOn(React, 'useReducer').mockImplementation(useReducer);

  const { container, rerender } = render(
    <CustomSelect selectItems={sortingTypes} selectState={someValue} dispatch={someDispatch} />,
  );

  someValue = 'Price, low to high';

  rerender(<CustomSelect selectItems={sortingTypes} selectState={someValue} dispatch={someDispatch} />);
  expect(container).toMatchSnapshot();
});
