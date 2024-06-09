import type { ClientResponse, CustomerSignin, CustomerSignInResult } from '@commercetools/platform-sdk';

import type { GeekShopCustomerDraft } from '@/common/types';

import { AnonymousFlow, apiRoot, ClientCridentialsFlow, PasswordFlow, tokenCache } from './build-client';

export function login(customerSignin: CustomerSignin): Promise<ClientResponse<CustomerSignInResult>> {
  Object.assign(apiRoot, PasswordFlow(customerSignin.email, customerSignin.password));
  return apiRoot.login().post({ body: customerSignin }).execute();
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
    } else {
      throw new Error(`Failed to revoke token ${response.status} ${await response.text()}`);
    }
  };

  return revokeToken();
}

export function signup(myCustomerDraft: GeekShopCustomerDraft): Promise<ClientResponse<CustomerSignInResult>> {
  Object.assign(apiRoot, ClientCridentialsFlow());
  return apiRoot.me().signup().post({ body: myCustomerDraft }).execute();
}
