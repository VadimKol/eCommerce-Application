import classNames from 'classnames';

import styles from './styles.module.scss';

export function PromocodeLine(): JSX.Element {
  return (
    <div className={styles.animateBlock}>
      <div className={classNames(styles.animateLine, styles.animateLineFirst)}>
        Apply Promo Code &quot;GEEK-SHOP&quot; and get 10% discount
      </div>
      <div className={classNames(styles.animateLine, styles.animateLineSecond)}>
        Apply Promo Code &quot;GEEK-SHOP&quot; and get 10% discount
      </div>
    </div>
  );
}

export default PromocodeLine;
