import { render } from '@testing-library/react';

import { Tooltip } from '@/components/tooltip/Tooltip';

it('renders correctly', () => {
  const { container } = render(<Tooltip text="" />);
  expect(container).toMatchSnapshot();
});
