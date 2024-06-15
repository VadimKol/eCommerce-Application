import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { NavigationPaths } from '@/common/enums';
import { CartItem } from '@/components/cart-item/CartItem';
import { CustomButton } from '@/components/custom-button/СustomButton';
import { useCart } from '@/hooks/useCart';

import styles from './styles.module.scss';

export function Cart(): JSX.Element {
  const { getCartItemsCount, cartItems, cart, clearFromCart, addPromocodeToCart } = useCart();
  const [isClearing, setIsClearing] = useState(false);
  const promocodeInput = useRef<HTMLInputElement>(null);

  if (!cart) {
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
                type="button"
                aria-label="Clear cart"
                className={styles.clear_cart}
                onClick={() => {
                  setIsClearing(true);
                  clearFromCart(cartItems.map((cartItem) => cartItem.id))
                    .then(() => toast('Successfully cleared', { type: 'success' }))
                    .catch(() => toast('Failed to clear', { type: 'error' }))
                    .finally(() => setIsClearing(false));
                }}
                isDisabled={isClearing}
              >
                {isClearing ? 'Clearing' : 'Clear cart'}
              </CustomButton>
            </div>
            <div className={styles.total_price_block}>
              <p className={styles.total_price}>
                <span>Subtotal</span>
                <span className={styles.price}>${(cart.totalPrice.centAmount / 100).toFixed(2)}</span>
              </p>
              {cart.discountOnTotalPrice && (
                <p className={styles.discount_block}>
                  <span>Discount</span>
                  <span className={styles.discount}>
                    ${' '}
                    {(
                      (cart.discountOnTotalPrice.discountedAmount.centAmount + cart.totalPrice.centAmount) /
                      100
                    ).toFixed(2)}
                  </span>
                </p>
              )}
              <form
                className={styles.promobox}
                action=""
                method="post"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (promocodeInput.current?.value?.trim()) {
                    addPromocodeToCart(promocodeInput.current?.value.trim())
                      .then(() => toast('Successfully added Promocode', { type: 'success' }))
                      .catch((error: Error) => toast(error.message, { type: 'error' }));
                  }
                }}
              >
                <p className={styles.promo_desc}>Enter promocode</p>
                <div className={styles.promoblock}>
                  <input
                    type="text"
                    id="promocode"
                    placeholder="Promocode"
                    className={styles.promocode}
                    ref={promocodeInput}
                  />
                  <CustomButton type="submit" aria-label="Promo-button">
                    Apply
                  </CustomButton>
                </div>
              </form>
              <CustomButton type="button" aria-label="Check out" className={styles.check_out} variant="tertiary">
                Check out
              </CustomButton>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
