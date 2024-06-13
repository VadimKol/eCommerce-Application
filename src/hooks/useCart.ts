import { useContext } from 'react';

import type { CartContextProps } from '@/contexts/cart-context';
import { CartContext } from '@/contexts/cart-context';

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
