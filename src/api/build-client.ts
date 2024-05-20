import { type ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  type AnonymousAuthMiddlewareOptions,
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
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

// Client cridentials flow api root
export const getClientCridentialsFlowApiRoot = (): ByProjectKeyRequestBuilder => {
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

// Password flow api root
export const getPasswordFlowApiRoot = (email: string, password: string): ByProjectKeyRequestBuilder => {
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

// Anonymous session flow api root
export const getAnonymousFlowApiRoot = (): ByProjectKeyRequestBuilder => {
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

// Existing access token flow api root
export const getExistingTokenFlowApiRoot = (token: string): ByProjectKeyRequestBuilder => {
  const client = new ClientBuilder()
    .withExistingTokenFlow(`Bearer ${token}`, {})
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

const accessToken = sessionStorage.getItem('geek-shop-token');

export const apiRoot = accessToken !== null ? getExistingTokenFlowApiRoot(accessToken) : getAnonymousFlowApiRoot();
