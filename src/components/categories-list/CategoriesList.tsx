import { Link, useLoaderData } from 'react-router-dom';

import { NavigationPaths } from '@/common/enums';
import type { CategoriesData } from '@/common/types';

// import categoriesData from '@/router/mock-products.json';
import styles from './styles.module.scss';

export function CategoriesList(): JSX.Element {
  const categoriesData = useLoaderData();
  return (
    <div className={styles.categoriesContainer}>
      <ul className={styles.categoriesList}>
        {(categoriesData as CategoriesData).map((category) => (
          <li key={category.id} className={styles.categoryItem}>
            <Link to={`${NavigationPaths.CATALOG}/${category.key}`} className={styles.categoryLink}>
              {category.name}
            </Link>
            <ul className={styles.subcategoriesList}>
              {category.subcategories.map((subcategory) => (
                <li key={subcategory.id} className={styles.subcategoryItem}>
                  <Link
                    to={`${NavigationPaths.CATALOG}/${category.key}/${subcategory.key}`}
                    className={styles.subcategoryLink}
                  >
                    {subcategory.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
