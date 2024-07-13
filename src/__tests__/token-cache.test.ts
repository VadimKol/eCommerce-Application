import { CustomTokenCache } from '@/common/token-cache';

describe('CustomTokenCache', () => {
  let tokenCache: CustomTokenCache;

  beforeEach(() => {
    tokenCache = new CustomTokenCache();
  });

  afterEach(() => {
    localStorage.removeItem('geek-shop-refresh');
  });

  it('should initialize token store with default values', () => {
    expect(tokenCache.get()).toEqual({
      token: '',
      expirationTime: 0,
      refreshToken: '',
    });
  });

  it('should set token store correctly', () => {
    const mockTokenStore = {
      token: 'mock-token',
      expirationTime: Date.now() + 3600 * 1000,
      refreshToken: 'mock-refresh-token',
    };

    tokenCache.set(mockTokenStore);

    expect(tokenCache.get()).toEqual(mockTokenStore);
  });

  it('should set token store in LocalStorage correctly', () => {
    const mockTokenStore = {
      token: 'mock-token',
      expirationTime: Date.now() + 3600 * 1000,
      refreshToken: 'mock-refresh-token',
    };

    tokenCache.set(mockTokenStore);

    expect(tokenCache.get().refreshToken).toEqual(localStorage.getItem('geek-shop-refresh'));
  });
});
