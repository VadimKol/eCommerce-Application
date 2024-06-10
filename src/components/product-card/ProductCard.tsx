import { Link } from 'react-router-dom';

import { NavigationPaths } from '@/common/enums';

import { CustomButton } from '../custom-button/СustomButton';
import styles from './styles.module.scss';
import { type ProductCardProps } from './types';

export function ProductCard({ product, categoryName, subcategoryName }: ProductCardProps): JSX.Element {
  return (
    <div className={styles.product_link}>
      <Link
        to={`${NavigationPaths.CATALOG}/${categoryName || product.keyCategory}/${subcategoryName || product.keySubCategory}/${product.key}`}
        className={styles.image_container}
      >
        <img className={styles.product_img} src={product.images[0]} alt="Product" />
      </Link>
      <div className={styles.text_container}>
        <p className={styles.product_name}>{product.name}</p>
        <p className={styles.product_description}>{product.description}</p>
        <p className={styles.price_block}>
          {product.discount && <span>${product.discount}</span>}
          <span className={product.discount && styles.product_discount}>${product.price}</span>
        </p>
        <CustomButton className={styles.btn_details} variant="tertiary">
          Add to cart
        </CustomButton>
      </div>
    </div>
  );
}
