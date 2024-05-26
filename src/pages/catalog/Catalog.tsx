import classNames from 'classnames';
import { Link, useLoaderData, useParams } from 'react-router-dom';

import { NavigationPaths } from '@/common/enums';
import type { Category, LoaderData, Product, Subcategory } from '@/common/types';
import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs';
import { CategoriesList } from '@/components/categories-list/CategoriesList';

import styles from './styles.module.scss';

export function Catalog(): JSX.Element {
  const data = useLoaderData() as LoaderData;
  const { categoryName, subcategoryName } = useParams<{ categoryName?: string; subcategoryName?: string }>();

  let title = 'All Products';
  let products: Product[] = [];

  if (!categoryName) {
    const categories = data as Category[];
    categories.forEach((category) => {
      category.subcategories.forEach((subcat) => {
        products = products.concat(subcat.products);
      });
    });
  } else if (categoryName && !subcategoryName) {
    const category = data.category as Category;
    title = `Category: ${category.name}`;
    category.subcategories.forEach((subcat) => {
      products = products.concat(subcat.products);
    });
  } else if (categoryName && subcategoryName) {
    const { subcategory } = data as { subcategory: Subcategory };
    title = `Subcategory: ${subcategory.name}`;
    products = subcategory.products;
  }

  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.container}>
        <CategoriesList />
        <Breadcrumbs />
        <h1>{title}</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link
                to={`${NavigationPaths.CATALOG}/${categoryName || product.categoryId}/${subcategoryName || product.subcategoryId}/${product.id}`}
              >
                {product.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
