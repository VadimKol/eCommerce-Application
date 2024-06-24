import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { NavigationPaths } from '@/common/enums';
import { CartItem } from '@/components/cart-item/CartItem';
import { ClearModal } from '@/components/clear-modal/ClearModal';
import { CustomButton } from '@/components/custom-button/СustomButton';
import { useCart } from '@/hooks/useCart';
import { usePromocodes } from '@/hooks/usePromocodes';

import styles from './styles.module.scss';
import { TotalPrice } from './total-price/TotalPrice';

export function Cart(): JSX.Element {
  const { getCartItemsCount, cartItems, cart, clearFromCart, addPromocodeToCart } = useCart();
  const { promocodes } = usePromocodes();
  const [isModal, setIsModal] = useState(false);

  if (isModal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  if (!cart || !promocodes) {
    return (
      <main className={classNames('main', styles.main)}>
        <div className={styles.infoContainer}>Loading cart...</div>
      </main>
    );
  }

  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.container}>
        {getCartItemsCount() === 0 ? (
          <div className={styles.empty}>
            <p className={styles.empty_desc}>Your cart is currently empty.</p>
            <CustomButton>
              <Link to={NavigationPaths.CATALOG} className={styles.link}>
                Continue shopping
              </Link>
            </CustomButton>
          </div>
        ) : (
          <>
            <div className={styles.cart}>
              <ul className={styles.products}>
                {cartItems.map((product) => (
                  <li key={`${product.id}cart`} className={styles.products_item}>
                    <CartItem product={product} />
                  </li>
                ))}
              </ul>
              <CustomButton
                aria-label="Clear cart"
                className={styles.clear_cart}
                onClick={() => setIsModal(true)}
                variant="cancel"
              >
                Clear cart
              </CustomButton>
            </div>
            <TotalPrice addPromocode={addPromocodeToCart} promocodes={promocodes} cartItems={cartItems} cart={cart} />
          </>
        )}
      </div>
      <ClearModal isModal={isModal} setIsModal={setIsModal} cartItems={cartItems} clearFromCart={clearFromCart} />
    </main>
  );
}
