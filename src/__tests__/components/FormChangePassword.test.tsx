import { render } from '@testing-library/react';

import { FormChangePassword } from '@/components/form-change-password/FormChangePassword';

it('renders correctly', () => {
  const setter = (): void => {};

  const { container } = render(<FormChangePassword email="user@example.com" version={1} setPersonInfo={setter} />);
  expect(container).toMatchSnapshot();
});
