import type { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

import { REFRESH_TOKEN_EXPIRATION_DAYS } from './utils';

export class CustomTokenCache implements TokenCache {
  private tokenStore: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  public set(tokenStore: TokenStore): void {
    this.tokenStore = tokenStore;
    if (tokenStore.refreshToken) {
      localStorage.setItem('geek-shop-refresh', tokenStore.refreshToken);
      const dateNow = new Date();
      dateNow.setDate(dateNow.getDate() + REFRESH_TOKEN_EXPIRATION_DAYS);
      localStorage.setItem('geek-shop-expires', `${dateNow.getTime()}`);
    }
  }

  public get(): TokenStore {
    return this.tokenStore;
  }
}
