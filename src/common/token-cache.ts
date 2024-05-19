import type { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export class CustomTokenCache implements TokenCache {
  private tokenStore: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  public set(tokenStore: TokenStore): void {
    this.tokenStore = tokenStore;
  }

  public get(): TokenStore {
    return this.tokenStore;
  }
}
