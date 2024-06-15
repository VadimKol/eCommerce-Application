import { type LineItem } from '@commercetools/platform-sdk';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { DEFAULT_LOCALE } from '@/common/utils';
import { useCart } from '@/hooks/useCart';

import styles from './styles.module.scss';

export function CartItem({ product }: { product: LineItem }): JSX.Element {
  const { removeItemFromCart, changeItemQuantityFromCart } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);
  const [isChangingQuantity, setIsChangingQuantity] = useState(false);

  const price = (product.price.value.centAmount / 100).toFixed(2);
  const discount = product.price.discounted ? (product.price.discounted.value.centAmount / 100).toFixed(2) : '';
  const totalPrice = (product.totalPrice.centAmount / 100).toFixed(2);
  return (
    <>
      <button
        type="button"
        aria-label="remove"
        className={styles.remove}
        onClick={() => {
          setIsRemoving(true);
          removeItemFromCart(product.productId)
            .then(() => toast('Successfully removed', { type: 'success' }))
            .catch(() => toast('Failed to remove', { type: 'error' }))
            .finally(() => setIsRemoving(false));
        }}
        disabled={isRemoving}
      />
      <div className={styles.image_box}>
        <img
          className={styles.product_img}
          src={product.variant.images ? product.variant.images[0]?.url : ''}
          alt="Product"
        />
      </div>
      <div className={styles.product_desc}>
        <p className={styles.product_name}>{product.name[DEFAULT_LOCALE]}</p>
        <div className={styles.quantity_box}>
          <button
            type="button"
            aria-label="minus"
            className={isChangingQuantity ? styles.quantity_btn_loading : styles.quantity_btn}
            onClick={() => {
              setIsChangingQuantity(true);
              changeItemQuantityFromCart(product.productId, product.quantity - 1)
                .catch(() => toast('Failed to change quantity', { type: 'error' }))
                .finally(() => setIsChangingQuantity(false));
            }}
            disabled={isChangingQuantity}
          >
            -
          </button>
          <span className={styles.quantity}>{product.quantity}</span>
          <button
            type="button"
            aria-label="plus"
            className={isChangingQuantity ? styles.quantity_btn_loading : styles.quantity_btn}
            onClick={() => {
              setIsChangingQuantity(true);
              changeItemQuantityFromCart(product.productId, product.quantity + 1)
                .catch(() => toast('Failed to change quantity', { type: 'error' }))
                .finally(() => setIsChangingQuantity(false));
            }}
            disabled={product.quantity === product.variant.availability?.availableQuantity || isChangingQuantity}
          >
            +
          </button>
        </div>
        <div className={styles.price_n_discount}>
          <p className={styles.price_block}>
            {/*   {discount && <span>${discount}</span>} */}
            <span /* className={discount && styles.product_discount} */>${discount || price}</span>
          </p>
          <span className={styles.product_total_cost_block}>
            Total cost<span className={styles.product_total_cost}>${totalPrice}</span>
          </span>
        </div>
      </div>
    </>
  );
}
