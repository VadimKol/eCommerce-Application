import type { Cart, LineItem } from '@commercetools/platform-sdk';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { addToCart, getActiveCart, removeFromCart } from '../api/cart';

type CartProviderProps = {
  children: React.ReactNode;
};

export type CartContextProps = {
  cart: Cart | null;
  isItemInCart: (id: string) => boolean;
  getItemCount: (id: string) => number;
  getLineItemId: (id: string) => string;
  addItemToCart: (id: string, quantity: number) => Promise<void>;
  removeItemFromCart: (id: string, quantity: number) => Promise<void>;
  getCartItemsCount: () => number | undefined;
  cartItems: LineItem[];
  updateCart: () => Promise<void>;
};

export const CartContext = createContext({} as CartContextProps);

export function CartProvider({ children }: CartProviderProps): React.ReactElement {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const fetchCart = async (): Promise<void> => {
      const response = await getActiveCart();
      setCart(response.body);
    };

    void fetchCart();
  }, []);

  const updateCart = useCallback(async (): Promise<void> => {
    const response = await getActiveCart();
    setCart(response.body);
  }, []);

  const cartItems = useMemo(() => (cart ? cart.lineItems : []), [cart]);

  const isItemInCart = useCallback(
    (id: string): boolean => cartItems.some((item) => item.productId === id),
    [cartItems],
  );

  const getLineItemId = useCallback(
    (id: string): string => {
      const item = cartItems.find((cartItem) => cartItem.productId === id);
      return item ? item.id : '';
    },
    [cartItems],
  );

  const getItemCount = useCallback(
    (id: string): number => {
      const item = cartItems.find((cartItem) => cartItem.productId === id);
      return item ? item.quantity : 0;
    },
    [cartItems],
  );

  const addItemToCart = useCallback(
    async (id: string, quantity: number): Promise<void> => {
      const response = await addToCart(cart!, id, quantity);

      setCart(response.body);
    },
    [cart],
  );

  const removeItemFromCart = useCallback(
    async (id: string, quantity: number): Promise<void> => {
      const lineItemId = getLineItemId(id);

      if (lineItemId) {
        const response = await removeFromCart(cart!, lineItemId, quantity);

        setCart(response.body);
      }
    },
    [cart, getLineItemId],
  );

  const getCartItemsCount = useCallback(
    (): number => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems],
  );

  const CartContextValue: CartContextProps = useMemo(
    () => ({
      cart,
      addItemToCart,
      removeItemFromCart,
      isItemInCart,
      getItemCount,
      getLineItemId,
      cartItems,
      getCartItemsCount,
      updateCart,
    }),
    [
      addItemToCart,
      removeItemFromCart,
      isItemInCart,
      getItemCount,
      getLineItemId,
      cartItems,
      getCartItemsCount,
      cart,
      updateCart,
    ],
  );

  return <CartContext.Provider value={CartContextValue}>{children}</CartContext.Provider>;
}
