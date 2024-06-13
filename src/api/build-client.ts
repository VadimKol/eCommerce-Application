import { type ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  type AnonymousAuthMiddlewareOptions,
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';

import { CustomTokenCache } from '@/common/token-cache';
import { type Credentials, type User } from '@/common/types';

const host: string = import.meta.env.VITE_AUTH_URL;
const projectKey: string = import.meta.env.VITE_PROJECT_KEY;
const credentials: Credentials = {
  clientId: import.meta.env.VITE_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CLIENT_SECRET,
};
const scopes: string[] = import.meta.env.VITE_SCOPES.split(' ');

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_API_URL,
  fetch,
};

export const tokenCache = new CustomTokenCache();

// Client credentials flow
export const ClientCredentialsFlow = (): ByProjectKeyRequestBuilder => {
  Object.assign(tokenCache, new CustomTokenCache());
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host,
    projectKey,
    credentials,
    scopes,
    tokenCache,
    fetch,
  };

  const client = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

// Password flow
export const PasswordFlow = (email: string, password: string): ByProjectKeyRequestBuilder => {
  Object.assign(tokenCache, new CustomTokenCache());
  const user: User = { username: email, password };
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host,
    projectKey,
    credentials: { ...credentials, user },
    scopes,
    tokenCache,
    fetch,
  };

  const client = new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

// Anonymous flow
export const AnonymousFlow = (): ByProjectKeyRequestBuilder => {
  Object.assign(tokenCache, new CustomTokenCache());
  const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host,
    projectKey,
    credentials,
    scopes,
    tokenCache,
    fetch,
  };

  const client = new ClientBuilder()
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

// Existing flow
export const ExistingTokenFlow = (token: string): ByProjectKeyRequestBuilder => {
  const client = new ClientBuilder()
    .withExistingTokenFlow(`Bearer ${token}`, {})
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

// Refresh flow
export const RefreshTokenFlow = (refreshToken: string): ByProjectKeyRequestBuilder => {
  const refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
    host,
    projectKey,
    credentials,
    tokenCache,
    refreshToken,
    fetch,
  };

  const client = new ClientBuilder()
    .withRefreshTokenFlow(refreshAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

const expirationTime = localStorage.getItem('geek-shop-expires');
if (expirationTime !== null && Number(expirationTime) < Date.now()) {
  localStorage.removeItem('geek-shop-auth');
  localStorage.removeItem('geek-shop-refresh');
  localStorage.removeItem('geek-shop-expires');
}
const refreshToken = localStorage.getItem('geek-shop-refresh');

export const apiRoot = refreshToken !== null ? RefreshTokenFlow(refreshToken) : AnonymousFlow();

if (refreshToken === null) {
  apiRoot
    .me()
    .carts()
    .post({ body: { currency: 'USD' } })
    .execute()
    .catch(() => {
      throw new Error('Failed to create cart');
    });
}
