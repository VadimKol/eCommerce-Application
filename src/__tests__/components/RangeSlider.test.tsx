import { render } from '@testing-library/react';

import { PRICE_FILTER_MAX, PRICE_FILTER_MIN } from '@/common/utils';
import { RangeSlider } from '@/components/range-slider/RangeSlider';

it('renders correctly', () => {
  const someDispatch = (): void => {};
  const { container } = render(
    <RangeSlider
      min={PRICE_FILTER_MIN}
      max={PRICE_FILTER_MAX}
      priceFilter={[PRICE_FILTER_MIN, PRICE_FILTER_MAX]}
      dispatch={someDispatch}
    />,
  );

  expect(container).toMatchSnapshot();
});
