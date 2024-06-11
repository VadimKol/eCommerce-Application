import classNames from 'classnames';

import { CustomButton } from '@/components/custom-button/СustomButton';

import styles from './styles.module.scss';

export function Cart(): JSX.Element {
  return (
    <main className={classNames('main', styles.main)}>
      <h2 className={styles.title}>Cart</h2>
      <div className={styles.container}>
        <div className={styles.cart}>
          <ul className={styles.products}>
            <li className={styles.products_item}>
              <button type="button" aria-label="remove" className={styles.remove} />
              <div className={styles.image_box}>
                <img
                  className={styles.product_img}
                  src="https://images.cdn.us-central1.gcp.commercetools.com/7ebf5186-836a-4e2a-87f7-2e07de4e0e82/R-dyYgsRZ9.jpg"
                  alt="Product"
                />
              </div>
              <div className={styles.product_desc}>
                <p className={styles.product_name}>Hammer Harley Quinn</p>
                <div className={styles.quantity_box}>
                  <button type="button" aria-label="minus" className={styles.quantity_btn}>
                    -
                  </button>
                  <span className={styles.quantity}>11</span>
                  <button type="button" aria-label="plus" className={styles.quantity_btn}>
                    +
                  </button>
                </div>
                <p className={styles.price_n_remove_block}>
                  <p className={styles.price_block}>
                    {/* product.discount &&  */ <span>$14.85</span>}
                    <span className={/* product.discount && */ styles.product_discount}>$16.50</span>
                  </p>
                  <span className={styles.product_total_cost_block}>
                    Total cost<span className={styles.product_total_cost}>$163.35</span>
                  </span>
                </p>
              </div>
            </li>
            <li className={styles.products_item}>
              <button type="button" aria-label="remove" className={styles.remove} />
              <div className={styles.image_box}>
                <img
                  className={styles.product_img}
                  src="https://images.cdn.us-central1.gcp.commercetools.com/7ebf5186-836a-4e2a-87f7-2e07de4e0e82/R-dyYgsRZ9.jpg"
                  alt="Product"
                />
              </div>
              <div className={styles.product_desc}>
                <p className={styles.product_name}>Hammer Harley Quinn</p>
                <div className={styles.quantity_box}>
                  <button type="button" aria-label="minus" className={styles.quantity_btn}>
                    -
                  </button>
                  <span className={styles.quantity}>11</span>
                  <button type="button" aria-label="plus" className={styles.quantity_btn}>
                    +
                  </button>
                </div>
                <p className={styles.price_n_remove_block}>
                  <p className={styles.price_block}>
                    {/* product.discount &&  */ <span>$14.85</span>}
                    <span className={/* product.discount && */ styles.product_discount}>$16.50</span>
                  </p>
                  <span className={styles.product_total_cost_block}>
                    Total cost<span className={styles.product_total_cost}>$163.35</span>
                  </span>
                </p>
              </div>
            </li>
          </ul>
          <CustomButton type="button" aria-label="Clear cart" className={styles.clear_cart}>
            Clear cart
          </CustomButton>
        </div>
        <div className={styles.total_price_block}>
          <p className={styles.total_price}>
            <span>Subtotal</span>
            <span className={styles.price}>$326.70</span>
          </p>
          <p className={styles.discount_block}>
            <span>Discount</span>
            <span className={styles.discount}>$363.00</span>
          </p>
          <form
            className={styles.promobox}
            action=""
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <p className={styles.promo_desc}>Enter promocode</p>
            <div className={styles.promoblock}>
              <input type="text" id="promocode" placeholder="Promocode" className={styles.promocode} />
              <CustomButton type="submit" aria-label="Promo-button">
                Apply
              </CustomButton>
            </div>
          </form>
          <CustomButton type="button" aria-label="Check out" className={styles.check_out} variant="tertiary">
            Check out
          </CustomButton>
        </div>
      </div>
    </main>
  );
}
