import type { Cart } from '@commercetools/platform-sdk';
import { render } from '@testing-library/react';

import { TotalPrice } from '@/pages/cart/total-price/TotalPrice';

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
  const { container } = render(
    <TotalPrice
      addPromocode={jest.fn()}
      promocodes={[{ id: '123456', name: 'GEEK-SHOP' }]}
      cartItems={[]}
      cart={cart}
    />,
  );
  expect(container).toMatchSnapshot();
});
