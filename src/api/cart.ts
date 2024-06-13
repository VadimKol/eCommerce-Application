import type { Cart, ClientResponse } from '@commercetools/platform-sdk';

import { apiRoot } from './build-client';

export const createCart = async (): Promise<ClientResponse<Cart>> =>
  apiRoot
    .me()
    .carts()
    .post({ body: { currency: 'USD' } })
    .execute();

export const getActiveCart = async (): Promise<ClientResponse<Cart>> => apiRoot.me().activeCart().get().execute();

export const addToCart = async (cart: Cart, productId: string, quantity: number): Promise<ClientResponse<Cart>> =>
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

export const removeFromCart = async (cart: Cart, lineItemId: string, quantity: number): Promise<ClientResponse<Cart>> =>
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
