import { useEffect, useRef, useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getProducts } from '@/api/client-actions';
import { NavigationPaths } from '@/common/enums';
import type { CategoriesData, Product } from '@/common/types';
import { QUERY_LIMIT, sortingTypes } from '@/common/utils';
import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs';
import { CategoriesList } from '@/components/categories-list/CategoriesList';
import { CustomSelect } from '@/components/custom-select/CustomSelect';
import { Filters } from '@/components/filters/Filters';

import styles from './styles.module.scss';

export function Catalog(): JSX.Element {
  const categoriesData = useLoaderData() as CategoriesData;
  const [products, SetProducts] = useState<Product[]>([]);
  const { categoryName, subcategoryName } = useParams<{ categoryName?: string; subcategoryName?: string }>();
  const [page, setPage] = useState(0);

  const title = useRef('All Products');
  const total = useRef(0);

  useEffect(() => {
    const categoryID = categoriesData.find((category) => category.key === categoryName);
    title.current = 'All Products';
    if (categoryID) {
      title.current = categoryID.name;
    }
    const subcategoryID = categoryID?.subcategories.find((subcategory) => subcategory.key === subcategoryName);
    if (subcategoryID) {
      title.current = subcategoryID.name;
    }
    getProducts(page, categoryID?.id, subcategoryID?.id)
      .then((data) => {
        total.current = data.total;
        data.products.forEach((product) => {
          const category = categoriesData.find((c) => c.id === product.categoryId);
          if (category) {
            product.slugCategory = category.slug;
            product.keyCategory = category.key;
          }
          const subcategory = category?.subcategories.find((sc) => sc.id === product.subcategoryId);
          if (subcategory) {
            product.slugSubCategory = subcategory.slug;
            product.keySubCategory = subcategory.key;
          }
        });
        SetProducts(data.products);
      })
      .catch((error: Error) => toast(error.message, { type: 'error' }));
  }, [categoryName, subcategoryName, categoriesData, page]);

  return (
    <main className="main">
      <CategoriesList />
      <Breadcrumbs />
      <div className={styles.container}>
        <h1>{title.current}</h1>
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
          <section className={styles.products_section}>
            <ul className={styles.products}>
              {products.map((product) => (
                <li key={product.id} className={styles.products_item}>
                  <Link
                    to={`${NavigationPaths.CATALOG}/${categoryName || product.keyCategory}/${subcategoryName || product.keySubCategory}/${product.key}`}
                    className={styles.product_link}
                  >
                    <div className={styles.image_box}>
                      <img className={styles.product_img} src={product.images[0]} alt="Product" />
                    </div>
                    <p className={styles.product_name}>{product.name}</p>
                    {/* <p className={styles.product_description}>{product.description}</p> */}
                    <p className={styles.product_price}>€{product.price}</p>
                  </Link>
                </li>
              ))}
            </ul>
            {total.current > QUERY_LIMIT && (
              <div className={styles.pagination}>
                <button
                  type="button"
                  aria-label="Left"
                  className={styles.pag_left}
                  onClick={() => {
                    setPage(page - 1);
                  }}
                />
                <div className={styles.pages}>
                  <span>{page + 1}</span>-
                  <span>{total.current / QUERY_LIMIT + (total.current % QUERY_LIMIT > 0 ? 1 : 0)}</span>
                </div>
                <button
                  type="button"
                  aria-label="Right"
                  className={styles.pag_right}
                  onClick={() => {
                    setPage(page + 1);
                  }}
                />
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
