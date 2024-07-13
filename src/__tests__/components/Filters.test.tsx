import { render } from '@testing-library/react';

import { countriesFilter, fandoms, materials, PRICE_FILTER_MAX, PRICE_FILTER_MIN } from '@/common/utils';
import { Filters } from '@/components/filters/Filters';

it('renders correctly', () => {
  const someDispatch = (): void => {};
  const { container } = render(
    <Filters
      priceFilter={[PRICE_FILTER_MIN, PRICE_FILTER_MAX]}
      franchises={Array(fandoms.length).fill(false)}
      countriesF={Array(countriesFilter.length).fill(false)}
      materialsF={Array(materials.length).fill(false)}
      dispatch={someDispatch}
    />,
  );

  expect(container).toMatchSnapshot();
});
