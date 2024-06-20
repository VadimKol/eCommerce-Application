import type { Cart, LineItem } from '@commercetools/platform-sdk';

import type { Promocode } from '@/contexts/promocodes-context';

export interface TotalPriceProps {
  addPromocode: (code: string) => Promise<void>;
  promocodes: Promocode[];
  cartItems: LineItem[];
  cart: Cart;
}
