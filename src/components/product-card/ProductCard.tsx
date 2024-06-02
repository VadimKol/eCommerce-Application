import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { NavigationPaths } from '@/common/enums';

import { CustomButton } from '../custom-button/СustomButton';
import styles from './styles.module.scss';
import { type ProductCardProps } from './types';

export function ProductCard({ product, categoryName, subcategoryName }: ProductCardProps): JSX.Element {
  const [details, setDetails] = useState(false);
  const description = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (description.current) {
      description.current.style.maxHeight = details ? `${description.current.scrollHeight}px` : '0';
    }
  });
  return (
    <>
      <Link
        to={`${NavigationPaths.CATALOG}/${categoryName || product.keyCategory}/${subcategoryName || product.keySubCategory}/${product.key}`}
        className={styles.product_link}
      >
        <div className={styles.image_box}>
          <img className={styles.product_img} src={product.images[0]} alt="Product" />
        </div>
        <div className={styles.item_box}>
          <p className={styles.product_name}>{product.name}</p>
          <p className={styles.product_description} ref={description}>
            {product.description}
          </p>
          <p className={styles.price_block}>
            {product.discount && <span>${product.discount}</span>}
            <span className={product.discount && styles.product_discount}>${product.price}</span>
          </p>
        </div>
      </Link>
      <CustomButton className={styles.btn_details} onClick={() => setDetails(!details)}>
        {details ? 'Hide' : 'Show'} details
      </CustomButton>
    </>
  );
}
