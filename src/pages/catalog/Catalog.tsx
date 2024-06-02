import { useEffect, useRef, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getProducts } from '@/api/client-actions';
import type { CategoriesData, Product } from '@/common/types';
import { QUERY_LIMIT, sortingTypes } from '@/common/utils';
import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs';
import { CategoriesList } from '@/components/categories-list/CategoriesList';
import { CustomSelect } from '@/components/custom-select/CustomSelect';
import { Filters } from '@/components/filters/Filters';
import { ProductCard } from '@/components/product-card/ProductCard';

import styles from './styles.module.scss';

export function Catalog(): JSX.Element {
  const categoriesData = useLoaderData() as CategoriesData;
  const [products, setProducts] = useState<Product[]>([]);
  const { categoryName, subcategoryName } = useParams<{ categoryName?: string; subcategoryName?: string }>();
  const [page, setPage] = useState(0);
  const [sortType, setSortType] = useState('Sort');

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
    getProducts(page, sortType, categoryID?.id, subcategoryID?.id)
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
        setProducts(data.products);
      })
      .catch((error: Error) => toast(error.message, { type: 'error' }));
  }, [categoryName, subcategoryName, categoriesData, page, sortType]);

  useEffect(() => {
    setPage(0);
    setSortType('Sort');
  }, [categoryName, subcategoryName]);

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
          <CustomSelect selectItems={sortingTypes} selectState={sortType} setSelectState={setSortType} />
        </div>
        <section className={styles.product_box}>
          <aside className={styles.filters}>
            <Filters />
          </aside>
          <section className={styles.products_section}>
            <ul className={styles.products}>
              {products.map((product) => (
                <li key={product.id} className={styles.products_item}>
                  <ProductCard product={product} categoryName={categoryName} subcategoryName={subcategoryName} />
                </li>
              ))}
            </ul>
            {total.current > QUERY_LIMIT && (
              <div className={styles.pagination}>
                {Boolean(page) && (
                  <button
                    type="button"
                    aria-label="Left"
                    className={styles.pag_left}
                    onClick={() => {
                      setPage(page - 1);
                    }}
                  />
                )}
                <div className={styles.pages}>
                  <span>{page + 1}</span>-
                  <span>{Math.floor(total.current / QUERY_LIMIT) + (total.current % QUERY_LIMIT > 0 ? 1 : 0)}</span>
                </div>
                {page + 1 < Math.floor(total.current / QUERY_LIMIT) + (total.current % QUERY_LIMIT > 0 ? 1 : 0) && (
                  <button
                    type="button"
                    aria-label="Right"
                    className={styles.pag_right}
                    onClick={() => {
                      setPage(page + 1);
                    }}
                  />
                )}
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
