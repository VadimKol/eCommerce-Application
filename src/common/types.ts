export interface AuthContextInterface {
  isAuthenticated: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
}

export interface Credentials {
  clientId: string;
  clientSecret: string;
}

export interface User {
  username: string;
  password: string;
}
