import { useLoaderData } from 'react-router-dom';

import type { LoaderData } from '@/common/types';
import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs';
import { CategoriesList } from '@/components/categories-list/CategoriesList';

import styles from './styles.module.scss';

export function Product(): JSX.Element {
  const { category, subcategory, product } = useLoaderData() as LoaderData;

  return (
    <main className="main">
      <div className={styles.topContainer}>
        <CategoriesList parentClass={styles.categoriesList} />
      </div>
      <Breadcrumbs parentClass={styles.breadcrumbs} />
      <div className={styles.container}>
        <div>
          {product && <h2>{product.name}</h2>}
          {product && <p>{product.description}</p>}
          {category && <p>Category: {category.name}</p>}
          {subcategory && <p>Subcategory: {subcategory.name}</p>}
        </div>
      </div>
    </main>
  );
}
