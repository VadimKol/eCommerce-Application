import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { logout } from '@/api/client-actions';
import { ActionPaths, NavigationPaths } from '@/common/enums';
import { useAuth } from '@/hooks/useAuth';

import styles from './styles.module.scss';

interface Props {
  isInsideBurgerMenu?: boolean;
}

export function HeaderLinks({ isInsideBurgerMenu = false }: Props): JSX.Element {
  const { isAuthenticated, handleLogout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const onLogoutClick = (): void => {
    logout()
      .then(() => {
        toast('Successfully logged out', { type: 'success' });
        handleLogout();

        if (location.pathname !== String(NavigationPaths.HOME)) {
          navigate(NavigationPaths.HOME);
        }
      })
      .catch(() => {
        toast(`Failed to logout`, { type: 'error' });
      });
  };

  const isCurrentLink = (path: NavigationPaths): boolean => location.pathname === String(path);
  const shouldShowRegisterLink = location.pathname !== String(ActionPaths.REGISTER);
  const shouldShowLoginLink = location.pathname !== String(ActionPaths.LOGIN);

  return (
    <>
      <nav className={classNames(styles.navigation, { [styles.insideMenu || '']: isInsideBurgerMenu })}>
        <ul className={styles.navList}>
          {Object.keys(NavigationPaths).map((path) => (
            <li key={path}>
              {isCurrentLink(NavigationPaths[path as keyof typeof NavigationPaths]) ? (
                <span className={classNames(styles.navLink, styles.navLinkCurrent)}>{path}</span>
              ) : (
                <Link className={styles.navLink} to={NavigationPaths[path as keyof typeof NavigationPaths]}>
                  {path}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <ul className={classNames(styles.actionsList, { [styles.insideMenu || '']: isInsideBurgerMenu })}>
        {isAuthenticated ? (
          <li className={styles.actionsItem}>
            <button className={styles.logoutButton} type="button" onClick={onLogoutClick}>
              Logout
            </button>
          </li>
        ) : (
          <>
            {shouldShowLoginLink && (
              <li className={styles.actionsItem}>
                <Link to={ActionPaths.LOGIN} className={classNames(styles.actionLink, styles.loginLink)}>
                  Login
                </Link>
              </li>
            )}
            {shouldShowRegisterLink && (
              <li className={styles.actionsItem}>
                <Link to={ActionPaths.REGISTER} className={classNames(styles.actionLink, styles.registerLink)}>
                  Register
                </Link>
              </li>
            )}
          </>
        )}
      </ul>
    </>
  );
}
