import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ActionPaths, NavigationPaths } from '@/common/enums';
import { useAuth } from '@/hooks/useAuth';

import styles from './styles.module.scss';

export function Header({ appStyles }: { appStyles: string | undefined }): JSX.Element {
  const { isAuthenticated, handleLogout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const onLogoutClick = (): void => {
    handleLogout();

    if (location.pathname !== String(NavigationPaths.HOME)) {
      navigate(NavigationPaths.HOME);
    }
  };

  const isCurrentLink = (path: NavigationPaths): boolean => location.pathname === String(path);
  const shouldShowRegisterLink = location.pathname !== String(ActionPaths.REGISTER);
  const shouldShowLoginLink = location.pathname !== String(ActionPaths.LOGIN);

  return (
    <header className={`${appStyles || ''} ${styles.header}`}>
      <div className={styles.logo}>
        <Link to={NavigationPaths.HOME}>
          <img src="/logo.png" alt="Geek Store logo" />
        </Link>
      </div>
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          {Object.keys(NavigationPaths).map((path) => (
            <li key={path}>
              {isCurrentLink(NavigationPaths[path as keyof typeof NavigationPaths]) ? (
                <span className={`${styles.navLink} ${styles.navLinkCurrent}`}>{path}</span>
              ) : (
                <Link className={styles.navLink} to={NavigationPaths[path as keyof typeof NavigationPaths]}>
                  {path}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.actions}>
        {isAuthenticated ? (
          <button className={styles.logoutButton} type="button" onClick={onLogoutClick}>
            Logout
          </button>
        ) : (
          <>
            {shouldShowLoginLink && (
              <Link to={ActionPaths.LOGIN} className={styles.loginLink}>
                Login
              </Link>
            )}
            {shouldShowRegisterLink && (
              <Link to={ActionPaths.REGISTER} className={styles.registerLink}>
                Register
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}
