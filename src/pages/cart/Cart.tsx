import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { NavigationPaths } from '@/common/enums';
import { Discounts } from '@/common/utils';
import { CartItem } from '@/components/cart-item/CartItem';
import { CustomButton } from '@/components/custom-button/СustomButton';
import { useCart } from '@/hooks/useCart';
import { usePromocodes } from '@/hooks/usePromocodes';

import styles from './styles.module.scss';

export function Cart(): JSX.Element {
  const { getCartItemsCount, cartItems, cart, clearFromCart, addPromocodeToCart } = useCart();
  const { promocodes } = usePromocodes();
  const [isClearing, setIsClearing] = useState(false);
  const promocodeInput = useRef<HTMLInputElement>(null);
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
  const appliedPromocodes = promocodes
    .filter(({ id }) => cart.discountCodes.map(({ discountCode }) => discountCode.id).includes(id))
    .map(({ name }) => name);

  const total = (cart.totalPrice.centAmount / 100).toFixed(2);
  const subtotal = (cartItems.reduce((acc, item) => acc + item.totalPrice.centAmount, 0) / 100).toFixed(2);
  const discount = (Number(subtotal) - Number(total)).toFixed(2);

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
            <div className={styles.total_price_block}>
              <p className={styles.total_price}>
                <span>Total:</span>
                <span className={styles.price}>${total}</span>
              </p>
              <p className={styles.discount_block}>
                <span>Cart discount:</span>
                <span className={styles.price}>${discount}</span>
              </p>
              <p className={styles.original_price_block}>
                <span>Subtotal:</span>
                <span className={styles.discount}>${subtotal}</span>
              </p>
              {appliedPromocodes.map((promo) => (
                <p key={promo} className={styles.promocodes}>
                  <span>{`"${promo}"`}</span>
                  <span className={styles.promocodes_applied}>
                    {Discounts.find((item) => item.name === promo)?.desc}
                  </span>
                </p>
              ))}
              <form
                className={styles.promobox}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (promocodeInput.current?.value?.trim()) {
                    const promocode = promocodeInput.current.value.trim();
                    promocodeInput.current.value = '';
                    if (!appliedPromocodes.includes(promocode)) {
                      addPromocodeToCart(promocode)
                        .then(() => {
                          toast('Successfully added Promocode', { type: 'success' });
                        })
                        .catch((error: Error) => toast(error.message, { type: 'error' }));
                    } else {
                      toast(`The discount code '${promocode}' already applied`, { type: 'error' });
                    }
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
      <div
        className={isModal ? styles.wrapper : `${styles.wrapper} ${styles.wrapper_hidden}`}
        onTransitionEnd={(e) => {
          if (e.target === e.currentTarget) {
            setIsClearing(false);
          }
        }}
      >
        <div className={styles.modal}>
          <p className={styles.question}>Are you sure you want to clear the cart?</p>
          <div className={styles.buttons}>
            <CustomButton
              aria-label="Cancel"
              onClick={() => setIsModal(false)}
              isDisabled={!isModal}
              className={styles.cancel}
              variant="cancel"
            >
              Cancel
            </CustomButton>
            <CustomButton
              aria-label="Confirm"
              isDisabled={isClearing}
              onClick={() => {
                setIsClearing(true);
                clearFromCart(cartItems.map((cartItem) => cartItem.id))
                  .then(() => toast('Successfully cleared', { type: 'success' }))
                  .catch(() => toast('Failed to clear', { type: 'error' }))
                  .finally(() => setIsModal(false));
              }}
              className={styles.confirm}
              variant="secondary"
            >
              {isClearing ? 'Clearing' : 'Confirm'}
            </CustomButton>
          </div>
        </div>
      </div>
    </main>
  );
}
