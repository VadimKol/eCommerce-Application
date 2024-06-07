import { render } from '@testing-library/react';

import { FormProfileAddresses } from '@/components/form-profile-addresses/FormProfileAddresses';

it('renders correctly', () => {
  const setter = (): void => {};

  const { container } = render(
    <FormProfileAddresses
      version={1}
      addresses={[]}
      defaultAddress=""
      isBilling={false}
      setPersonInfo={setter}
      setAddressesShip={setter}
      setAddressesBill={setter}
    />,
  );
  expect(container).toMatchSnapshot();
});
