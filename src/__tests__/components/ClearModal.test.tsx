import { render } from '@testing-library/react';

import { ClearModal } from '@/components/clear-modal/ClearModal';

it('renders correctly', () => {
  const { container } = render(<ClearModal isModal setIsModal={jest.fn()} cartItems={[]} clearFromCart={jest.fn()} />);
  expect(container).toMatchSnapshot();
});
