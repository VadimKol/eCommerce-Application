import { render } from '@testing-library/react';

import { sortingTypes } from '@/common/utils';
import { CustomSelect } from '@/components/custom-select/CustomSelect';

it('renders correctly', () => {
  const someValue = 'Sort';
  const someDispatch = (): void => {};

  const { container } = render(
    <CustomSelect selectItems={sortingTypes} selectState={someValue} dispatch={someDispatch} />,
  );
  expect(container).toMatchSnapshot();
});
