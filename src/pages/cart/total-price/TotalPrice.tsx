import { CustomButton } from '@/components/custom-button/СustomButton';
import { Promocodes } from '@/components/promocodes/Promocodes';

import styles from './styles.module.scss';
import type { TotalPriceProps } from './types';

export function TotalPrice({ addPromocode, promocodes, cartItems, cart }: TotalPriceProps): JSX.Element {
  const total = (cart.totalPrice.centAmount / 100).toFixed(2);
  const subtotal = (
    cartItems.reduce((acc, item) => acc + item.price.value.centAmount * item.quantity, 0) / 100
  ).toFixed(2);
  const discount = (Number(subtotal) - Number(total)).toFixed(2);

  const isDiscounted =
    cartItems.some((item) => item.price.discounted !== undefined) ||
    cartItems.some((item) => item.discountedPricePerQuantity.length > 0) ||
    cart.discountOnTotalPrice;

  return (
    <div className={styles.total_price_block}>
      <p className={styles.total_price}>
        <span>Total:</span>
        <span className={styles.price}>${total}</span>
      </p>
      {isDiscounted && (
        <>
          <p className={styles.discount_block}>
            <span>Discount:</span>
            <span className={styles.price}>${discount}</span>
          </p>
          <p className={styles.original_price_block}>
            <span>Subtotal:</span>
            <span className={styles.discount}>${subtotal}</span>
          </p>
        </>
      )}
      <Promocodes promocodes={promocodes} addPromocode={addPromocode} cart={cart} />
      <CustomButton type="button" aria-label="Check out" className={styles.check_out} variant="tertiary">
        Check out
      </CustomButton>
    </div>
  );
}
