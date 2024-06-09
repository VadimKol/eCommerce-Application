import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getProduct } from '@/api/catalog';
import type { ProductDetails } from '@/common/types';
import { StatusError } from '@/common/utils';
import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs';
import { CategoriesList } from '@/components/categories-list/CategoriesList';
import { useCategories } from '@/hooks/useCategories';
import { NoMatch } from '@/pages/no-match/NoMatch';

import DetailedProduct from './detailed-product/DetailedProduct';
import styles from './styles.module.scss';

export function Product(): JSX.Element {
  const { productName: productKey } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [subcategoryError, setError] = useState(false);
  const { error: categoryError } = useCategories();

  useEffect(() => {
    const fetchProduct = async (): Promise<void> => {
      try {
        const productData = await getProduct(productKey || '');
        setProduct(productData);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    void fetchProduct();
  }, [productKey]);

  if (subcategoryError) {
    return <NoMatch />;
  }

  if (categoryError instanceof StatusError && categoryError.statusCode === 404) {
    return <NoMatch />;
  }

  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.topContainer}>
        <CategoriesList parentClass={styles.categoriesList} />
      </div>
      <Breadcrumbs parentClass={styles.breadcrumbs} />
      <div className={styles.container}>
        <DetailedProduct product={product} loading={loading} />
      </div>
    </main>
  );
}
