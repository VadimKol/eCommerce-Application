export interface AuthContextInterface {
  isAuthenticated: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
}
