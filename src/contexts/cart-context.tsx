import type { Cart, LineItem } from '@commercetools/platform-sdk';
import { createContext, type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { broadcastChannel } from '@/common/utils';

import {
  addPromocodeIntoCart,
  addToCart,
  changeQuantityFromCart,
  clearCart,
  createCart,
  getActiveCart,
  removeFromCart,
} from '../api/cart';

export type CartContextProps = {
  cart: Cart | null;
  isItemInCart: (id: string) => boolean;
  getItemCount: (id: string) => number;
  getLineItemId: (id: string) => string;
  addItemToCart: (id: string, quantity?: number) => Promise<void>;
  removeItemFromCart: (id: string, quantity?: number) => Promise<void>;
  getCartItemsCount: () => number | undefined;
  cartItems: LineItem[];
  updateCart: (updatedCard: Cart | null) => void;
  clearFromCart: (lineItems: string[]) => Promise<void>;
  changeItemQuantityFromCart: (id: string, quantity: number) => Promise<void>;
  addPromocodeToCart: (code: string) => Promise<void>;
};

export const CartContext = createContext({} as CartContextProps);

export function CartProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    if (localStorage.getItem('geek-shop-refresh') === null) {
      createCart()
        .then((response) => setCart(response.body))
        .catch(() => toast(`Failed to create cart`, { type: 'error' }));
    } else {
      getActiveCart()
        .then((response) => setCart(response.body))
        .catch(() => toast(`Failed to get cart`, { type: 'error' }));
    }
    const handleCart = (
      e: MessageEvent<{
        type: string;
        payload: { cart: Cart | null };
      }>,
    ): void => {
      if (e.data.type === 'Password' || e.data.type === 'Auth' || e.data.type === 'Cart') {
        setCart(e.data.payload.cart);
      }
    };
    broadcastChannel.addEventListener('message', handleCart);
    return (): void => {
      broadcastChannel.removeEventListener('message', handleCart);
    };
  }, []);

  const updateCart = useCallback((updatedCard: Cart | null): void => {
    setCart(updatedCard);
    broadcastChannel.postMessage({ type: 'Cart', payload: { cart: updatedCard } });
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
    async (id: string, quantity?: number): Promise<void> => {
      const response = await addToCart(cart!, id, quantity);

      setCart(response.body);
      broadcastChannel.postMessage({ type: 'Cart', payload: { cart: response.body } });
    },
    [cart],
  );

  const removeItemFromCart = useCallback(
    async (id: string, quantity?: number): Promise<void> => {
      const lineItemId = getLineItemId(id);

      if (lineItemId) {
        const response = await removeFromCart(cart!, lineItemId, quantity);

        setCart(response.body);
        broadcastChannel.postMessage({ type: 'Cart', payload: { cart: response.body } });
      }
    },
    [cart, getLineItemId],
  );

  const getCartItemsCount = useCallback(
    (): number => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems],
  );

  const clearFromCart = useCallback(
    async (lineItems: string[]): Promise<void> => {
      const response = await clearCart(cart!, lineItems);

      setCart(response.body);
      broadcastChannel.postMessage({ type: 'Cart', payload: { cart: response.body } });
    },
    [cart],
  );

  const changeItemQuantityFromCart = useCallback(
    async (id: string, quantity: number): Promise<void> => {
      const lineItemId = getLineItemId(id);

      if (lineItemId) {
        const response = await changeQuantityFromCart(cart!, lineItemId, quantity);

        setCart(response.body);
        broadcastChannel.postMessage({ type: 'Cart', payload: { cart: response.body } });
      }
    },
    [cart, getLineItemId],
  );

  const addPromocodeToCart = useCallback(
    async (code: string): Promise<void> => {
      const response = await addPromocodeIntoCart(cart!, code);

      setCart(response.body);
      broadcastChannel.postMessage({ type: 'Cart', payload: { cart: response.body } });
    },
    [cart],
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
      clearFromCart,
      changeItemQuantityFromCart,
      addPromocodeToCart,
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
      clearFromCart,
      changeItemQuantityFromCart,
      addPromocodeToCart,
    ],
  );

  return <CartContext.Provider value={CartContextValue}>{children}</CartContext.Provider>;
}
