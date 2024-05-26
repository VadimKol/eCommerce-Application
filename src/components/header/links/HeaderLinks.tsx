import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { logout } from '@/api/client-actions';
import { ActionPaths, NavigationPaths } from '@/common/enums';
import { NavLink } from '@/components/nav-link/NavLink';
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
        navigate(ActionPaths.LOGIN);
      })
      .catch(() => {
        toast(`Failed to logout`, { type: 'error' });
      });
  };

  const isCatalogPath = location.pathname.startsWith(NavigationPaths.CATALOG);

  return (
    <>
      <nav className={classNames(styles.navigation, { [styles.insideMenu!]: isInsideBurgerMenu })}>
        <ul className={styles.navList}>
          {Object.keys(NavigationPaths).map((key) => {
            const path = NavigationPaths[key as keyof typeof NavigationPaths];
            if (path === NavigationPaths.CATALOG) {
              return (
                <li key={key}>
                  <NavLink to={path} label={key} setIsCurrent={isCatalogPath} />
                </li>
              );
            }
            return (
              <li key={key}>
                <NavLink to={path} label={key} />
              </li>
            );
          })}
        </ul>
      </nav>
      <ul className={classNames(styles.actionsList, { [styles.insideMenu!]: isInsideBurgerMenu })}>
        {isAuthenticated ? (
          <>
            <li className={styles.actionsItem}>
              <button className={styles.logoutButton} type="button" onClick={onLogoutClick}>
                Logout
              </button>
            </li>
            <li className={styles.actionsItem}>
              <NavLink to={ActionPaths.PROFILE} label="Profile" />
            </li>
          </>
        ) : (
          <>
            <li className={styles.actionsItem}>
              <NavLink to={ActionPaths.LOGIN} label="Login" />
            </li>
            <li className={styles.actionsItem}>
              <NavLink to={ActionPaths.REGISTER} label="Register" />
            </li>
          </>
        )}
      </ul>
    </>
  );
}
