import { Link, useLoaderData, useParams } from 'react-router-dom';

import { NavigationPaths } from '@/common/enums';
import type { Category, LoaderData, Product, Subcategory } from '@/common/types';
import { sortingTypes } from '@/common/utils';
import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs';
import { CategoriesList } from '@/components/categories-list/CategoriesList';
import { CustomSelect } from '@/components/custom-select/CustomSelect';
import { Filters } from '@/components/filters/Filters';

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
    title = category.name;
    category.subcategories.forEach((subcat) => {
      products = products.concat(subcat.products);
    });
  } else if (categoryName && subcategoryName) {
    const { subcategory } = data as { subcategory: Subcategory };
    title = subcategory.name;
    products = subcategory.products;
  }

  return (
    <main className="main">
      <CategoriesList />
      <Breadcrumbs />
      <div className={styles.container}>
        <h1>{title}</h1>
        <form
          className={styles.search_form}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className={styles.search_box}>
            <input id="search" className={styles.search} type="text" placeholder="Search..." />
            <button type="submit" className={styles.search_button} aria-label="Search-button" />
          </div>
        </form>
        <div className={styles.sort_form}>
          <CustomSelect onClick={() => {}} selectItems={sortingTypes} />
        </div>
        <section className={styles.product_box}>
          <aside className={styles.filters}>
            <Filters />
          </aside>
          <ul className={styles.products}>
            {products.map((product, index) => (
              <li key={product.id} className={styles.products_item}>
                <Link
                  to={`${NavigationPaths.CATALOG}/${categoryName || product.categoryId}/${subcategoryName || product.subcategoryId}/${product.id}`}
                  className={styles.product_link}
                >
                  <img
                    className={styles.product_img}
                    src={`/src/assets/images/mock/mock${index + 1}.webp`}
                    alt="Product"
                    width="300px"
                    height="300px"
                  />
                  <p className={styles.product_description}>{product.name}</p>
                  <p className={styles.product_price}>£17</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
