import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createCart } from '@/api/cart';
import { logout } from '@/api/client-actions';
import { ActionPaths, NavigationPaths } from '@/common/enums';
import { CategoriesList } from '@/components/categories-list/CategoriesList';
import { NavLink } from '@/components/nav-link/NavLink';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useCategories } from '@/hooks/useCategories';

import styles from './styles.module.scss';

interface Props {
  isInsideBurgerMenu?: boolean;
}

export function HeaderLinks({ isInsideBurgerMenu = false }: Props): JSX.Element {
  const { isAuthenticated, handleLogout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { error: error404 } = useCategories();
  const { updateCart, getCartItemsCount } = useCart();

  const onLogoutClick = (): void => {
    logout()
      .then(async () => {
        toast('Successfully logged out', { type: 'success' });
        handleLogout();
        navigate(ActionPaths.LOGIN);
        try {
          const response = await createCart();
          updateCart(response.body || null);
        } catch {
          throw new Error(`Failed to create cart`);
        }
      })
      .catch((error: Error) => toast(error.message, { type: 'error' }));
  };

  const isCatalogPath = location.pathname.startsWith(`${NavigationPaths.CATALOG}`);
  const cartItemCount = getCartItemsCount();

  return (
    <>
      <nav className={classNames(styles.navigation, { [styles.insideMenu!]: isInsideBurgerMenu })}>
        <ul className={styles.navList}>
          {Object.keys(NavigationPaths).map((key) => {
            const path = NavigationPaths[key as keyof typeof NavigationPaths];
            if (path === NavigationPaths.CATALOG && !isInsideBurgerMenu) {
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
      {isInsideBurgerMenu && isCatalogPath && !error404 && <CategoriesList isInsideBurgerMenu />}
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
        <li className={styles.actionsItem}>
          <NavLink
            to={ActionPaths.CART}
            className={styles.cartLink}
            label="Items in cart:"
            extraInfo={cartItemCount ? `${cartItemCount}` : ''}
            icon="cart"
            insideBurgerMenu={isInsideBurgerMenu}
          />
        </li>
      </ul>
    </>
  );
}
