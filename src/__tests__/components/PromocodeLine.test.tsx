import { render } from '@testing-library/react';

import { PromocodeLine } from '@/components/promocode-line/PromocodeLine';

it('renders correctly', () => {
  const { container } = render(<PromocodeLine colorClass="" text="" copyText="" />);
  expect(container).toMatchSnapshot();
});
