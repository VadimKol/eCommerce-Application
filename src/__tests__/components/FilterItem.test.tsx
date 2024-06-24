import { render } from '@testing-library/react';

import { PRICE_FILTER_MAX, PRICE_FILTER_MIN } from '@/common/utils';
import { FilterItem } from '@/components/filters/filter-item/FilterItem';

it('renders correctly', () => {
  const someDispatch = (): void => {};
  const { container } = render(
    <FilterItem
      priceSlider
      priceFilter={[PRICE_FILTER_MIN, PRICE_FILTER_MAX]}
      checkboxesList={[]}
      stateField=""
      dispatch={someDispatch}
    />,
  );

  expect(container).toMatchSnapshot();
});
