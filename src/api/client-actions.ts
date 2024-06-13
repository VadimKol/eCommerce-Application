import type { ClientResponse, CustomerSignin, CustomerSignInResult } from '@commercetools/platform-sdk';

import type { GeekShopCustomerDraft } from '@/common/types';

import { AnonymousFlow, apiRoot, ClientCredentialsFlow, PasswordFlow, tokenCache } from './build-client';
import { createCart } from './cart';

export function login(body: CustomerSignin): Promise<ClientResponse<CustomerSignInResult>> {
  Object.assign(apiRoot, PasswordFlow(body.email, body.password));
  return apiRoot.login().post({ body }).execute();
}

export function logout(): Promise<void> {
  const revokeToken = async (): Promise<void> => {
    const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/oauth/token/revoke`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `token=${encodeURIComponent(tokenCache.get().token)}`,
    });

    if (response.ok) {
      localStorage.removeItem('geek-shop-auth');
      localStorage.removeItem('geek-shop-refresh');
      localStorage.removeItem('geek-shop-expires');
      Object.assign(apiRoot, AnonymousFlow());

      createCart().catch(() => {
        throw new Error('Failed to create cart');
      });
    } else {
      throw new Error(`Failed to revoke token ${response.status} ${await response.text()}`);
    }
  };

  return revokeToken();
}

export function signup(body: GeekShopCustomerDraft): Promise<ClientResponse<CustomerSignInResult>> {
  Object.assign(apiRoot, ClientCredentialsFlow());
  return apiRoot.me().signup().post({ body }).execute();
}
