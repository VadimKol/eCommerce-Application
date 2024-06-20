import { render } from '@testing-library/react';

import { Toast } from '@/components/toast/Toast';

it('renders correctly', () => {
  const { container } = render(<Toast />);
  expect(container).toMatchSnapshot();
});
