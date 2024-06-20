import { type LineItem } from '@commercetools/platform-sdk';
import { render } from '@testing-library/react';

import { DEFAULT_LOCALE } from '@/common/utils';
import { CartItem } from '@/components/cart-item/CartItem';

it('renders correctly', () => {
  const product: LineItem = {
    id: '',
    productId: '',
    name: {
      [DEFAULT_LOCALE]: '',
    },
    productType: {
      typeId: 'product-type',
      id: '',
    },
    variant: {
      id: 0,
    },
    price: {
      id: '',
      value: {
        type: 'centPrecision',
        centAmount: 0,
        currencyCode: 'USD',
        fractionDigits: 2,
      },
    },
    quantity: 0,
    totalPrice: {
      type: 'centPrecision',
      centAmount: 0,
      currencyCode: 'USD',
      fractionDigits: 2,
    },
    discountedPricePerQuantity: [],
    taxedPricePortions: [],
    state: [],
    perMethodTaxRate: [],
    priceMode: 'Platform',
    lineItemMode: 'Standard',
  };
  const { container } = render(<CartItem product={product} />);
  expect(container).toMatchSnapshot();
});
