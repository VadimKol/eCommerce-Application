import { type ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  type AnonymousAuthMiddlewareOptions,
  // type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  // type RefreshAuthMiddlewareOptions,
  // type TokenCache,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';

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

// Client cridentials flow api root
/* export const getClientCridentialsFlowApiRoot = (): ByProjectKeyRequestBuilder => {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host,
    projectKey,
    credentials,
    scopes,
    fetch,
  };

  const client = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // удалить скорее всего
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
}; */

// Password flow api root
export const getPasswordFlowApiRoot = (
  email: string,
  password: string,
  // tokenCache: TokenCache,
): ByProjectKeyRequestBuilder => {
  const user: User = { username: email, password };
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host,
    projectKey,
    credentials: { ...credentials, user },
    scopes,
    // tokenCache,
    fetch,
  };

  const client = new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // удалить скорее всего
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

// Anonymous session flow api root
export const getAnonymousFlowApiRoot = (/* tokenCache: TokenCache */): ByProjectKeyRequestBuilder => {
  const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host,
    projectKey,
    credentials,
    scopes,
    // tokenCache,
    fetch,
  };

  const client = new ClientBuilder()
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // удалить скорее всего
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

// Refresh token flow api root
/* export const getRefreshTokenFlowApiRoot = (refreshToken: string): ByProjectKeyRequestBuilder => {
  const refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
    host,
    projectKey,
    credentials,
    refreshToken,
    fetch,
  };

  const client = new ClientBuilder()
    .withRefreshTokenFlow(refreshAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // удалить скорее всего
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
}; */
