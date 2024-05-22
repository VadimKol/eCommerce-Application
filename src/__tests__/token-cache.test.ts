import { CustomTokenCache } from '@/common/token-cache';

describe('CustomTokenCache', () => {
  let tokenCache: CustomTokenCache;

  beforeEach(() => {
    tokenCache = new CustomTokenCache();
  });

  afterEach(() => {
    localStorage.removeItem('geek-shop-token');
  });

  it('should initialize token store with default values if no token is found in localStorage', () => {
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

  it('should initialize token store with token from localStorage if available', () => {
    localStorage.setItem('geek-shop-token', 'stored-token');

    tokenCache = new CustomTokenCache();

    expect(tokenCache.get().token).toEqual('stored-token');
  });
});
