import { render } from '@testing-library/react';

import { FormProfileAddresses } from '@/components/form-profile-addresses/FormProfileAddresses';
import { registerSchema } from '@/components/form-profile-addresses/register-schema';

describe('Testing profile address component', () => {
  test('good address not to throw', () => {
    expect(() =>
      registerSchema.parse({
        street: 'a',
        city: 'a',
        default: true,
        apartment: 'a',
        country: 'RU',
        postcode: '123456',
        id: '12345',
      }),
    ).not.toThrow();
  });

  test('address with bad postcode will throw', () => {
    expect(() =>
      registerSchema.parse({
        street: 'a',
        city: 'a',
        default: true,
        apartment: 'a',
        country: 'RU',
        postcode: '123',
        id: '12345',
      }),
    ).toThrow();
  });

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
});
