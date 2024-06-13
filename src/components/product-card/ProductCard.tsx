import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { NavigationPaths } from '@/common/enums';
import { CustomButton } from '@/components/custom-button/СustomButton.tsx';
import { useCart } from '@/hooks/useCart';

import { Loader } from '../loader/Loader';
import styles from './styles.module.scss';
import { type ProductCardProps } from './types';

export function ProductCard({ product, categoryName, subcategoryName }: ProductCardProps): JSX.Element {
  const { isItemInCart, addItemToCart, cartItems } = useCart();

  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    if (cartItems) {
      setIsInCart(isItemInCart(product.id));
      setIsLoading(false);
    }
  }, [cartItems, product.id, isItemInCart]);

  const handleAddToCart = async (): Promise<void> => {
    setIsAdding(true);
    await addItemToCart(product.id, 1);
    setIsAdding(false);
  };

  const getButtonText = (): string => {
    if (isLoading) {
      return 'Loading...';
    }
    if (isAdding) {
      return 'Adding...';
    }
    if (isInCart) {
      return 'In cart';
    }
    return 'Add to cart';
  };

  return (
    <div className={styles.card}>
      <div className={styles.image_container}>
        {isImageLoading && <Loader />}
        <img
          className={styles.product_img}
          src={product.images[0]}
          alt="Product"
          onLoad={() => setIsImageLoading(false)}
          style={{ display: isImageLoading ? 'none' : 'block' }}
        />
      </div>
      <div className={styles.text_container}>
        <Link
          to={`${NavigationPaths.CATALOG}/${categoryName || product.keyCategory}/${subcategoryName || product.keySubCategory}/${product.key}`}
          className={styles.card_link}
        >
          <h2 className={styles.card_title}>{product.name}</h2>
        </Link>
        <p className={styles.card_description}>{product.description}</p>
        <p className={styles.price_block}>
          {product.discount && <span>${product.discount}</span>}
          <span className={product.discount && styles.product_discount}>${product.price}</span>
        </p>
        <CustomButton
          className={styles.btn_cart}
          variant="tertiary"
          onClick={() => {
            handleAddToCart().catch(() => {});
          }}
          isDisabled={isLoading || isAdding || isInCart}
        >
          {getButtonText()}
        </CustomButton>
      </div>
    </div>
  );
}
