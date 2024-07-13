import type { Cart } from '@commercetools/platform-sdk';

import type { Promocode } from '@/contexts/promocodes-context';

export interface PromocodesProps {
  addPromocode: (code: string) => Promise<void>;
  promocodes: Promocode[];
  cart: Cart;
}
