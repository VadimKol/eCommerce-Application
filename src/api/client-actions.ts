import type { ClientResponse, Customer, CustomerSignin, CustomerSignInResult } from '@commercetools/platform-sdk';

import { CustomTokenCache } from '@/common/token-cache';
import type { GeekShopCustomerDraft } from '@/common/types';

import {
  apiRoot,
  getAnonymousFlowApiRoot,
  getClientCridentialsFlowApiRoot,
  getPasswordFlowApiRoot,
  tokenCache,
} from './build-client';

export function login(customerSignin: CustomerSignin): Promise<ClientResponse<CustomerSignInResult>> {
  Object.assign(apiRoot, getPasswordFlowApiRoot(customerSignin.email, customerSignin.password));
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
      localStorage.removeItem('geek-shop-token');
      Object.assign(tokenCache, new CustomTokenCache());
      Object.assign(apiRoot, getAnonymousFlowApiRoot());
    } else {
      throw new Error(`Failed to revoke token ${response.status} ${await response.text()}`);
    }
  };

  return revokeToken();
}

export function signup(myCustomerDraft: GeekShopCustomerDraft): Promise<ClientResponse<CustomerSignInResult>> {
  Object.assign(apiRoot, getClientCridentialsFlowApiRoot());
  return apiRoot.me().signup().post({ body: myCustomerDraft }).execute();
  // return apiRoot.customers().post({ body: myCustomerDraft }).execute(); // с анонима можно
}

export function profile(token: string): Promise<ClientResponse<Customer>> {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  Object.assign(apiRoot, getClientCridentialsFlowApiRoot());
  return apiRoot.me().get({ headers }).execute();
}
