import type { Cart, ClientResponse } from '@commercetools/platform-sdk';

import { REFRESH_TOKEN_EXPIRATION_DAYS } from '@/common/utils';

import { apiRoot } from './build-client';

export const createCart = async (): Promise<ClientResponse<Cart>> =>
  apiRoot
    .me()
    .carts()
    .post({ body: { currency: 'USD', deleteDaysAfterLastModification: REFRESH_TOKEN_EXPIRATION_DAYS } })
    .execute();

export const deleteCart = async (ID: string): Promise<ClientResponse<Cart> | null> => {
  const response = await apiRoot.carts().withId({ ID }).get().execute();
  if (response.body.cartState !== 'Merged') {
    return null;
  }

  return apiRoot
    .carts()
    .withId({ ID })
    .delete({ queryArgs: { version: response.body.version } })
    .execute();
};

export const getActiveCart = async (): Promise<ClientResponse<Cart>> => apiRoot.me().activeCart().get().execute();

export const addToCart = async (cart: Cart, productId: string, quantity?: number): Promise<ClientResponse<Cart>> =>
  apiRoot
    .me()
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [
          {
            action: 'addLineItem',
            productId,
            quantity,
          },
        ],
      },
    })
    .execute();

export const removeFromCart = async (
  cart: Cart,
  lineItemId: string,
  quantity?: number,
): Promise<ClientResponse<Cart>> =>
  apiRoot
    .me()
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
            quantity,
          },
        ],
      },
    })
    .execute();

export const clearCart = async (cart: Cart, lineItems: string[]): Promise<ClientResponse<Cart>> =>
  apiRoot
    .me()
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: lineItems.map((lineItemId) => ({ action: 'removeLineItem', lineItemId })),
      },
    })
    .execute();

export const changeQuantityFromCart = async (
  cart: Cart,
  lineItemId: string,
  quantity: number,
): Promise<ClientResponse<Cart>> =>
  apiRoot
    .me()
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId,
            quantity,
          },
        ],
      },
    })
    .execute();

export const addPromocodeIntoCart = async (cart: Cart, code: string): Promise<ClientResponse<Cart>> =>
  apiRoot
    .me()
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [
          {
            action: 'addDiscountCode',
            code,
          },
        ],
      },
    })
    .execute();
