import type { Cart } from '@commercetools/platform-sdk';
import { render } from '@testing-library/react';

import { Promocodes } from '@/components/promocodes/Promocodes';

it('renders correctly', () => {
  const cart: Cart = {
    id: '',
    version: 0,
    lineItems: [],
    customLineItems: [],
    totalPrice: {
      type: 'centPrecision',
      centAmount: 0,
      currencyCode: 'USD',
      fractionDigits: 0,
    },
    taxMode: 'Platform',
    taxRoundingMode: 'HalfEven',
    taxCalculationMode: 'LineItemLevel',
    inventoryMode: 'None',
    cartState: 'Active',
    shippingMode: 'Single',
    shipping: [],
    itemShippingAddresses: [],
    discountCodes: [],
    directDiscounts: [],
    refusedGifts: [],
    origin: 'Customer',
    createdAt: '',
    lastModifiedAt: '',
  };
  const { container } = render(<Promocodes promocodes={[]} addPromocode={jest.fn()} cart={cart} />);
  expect(container).toMatchSnapshot();
});
