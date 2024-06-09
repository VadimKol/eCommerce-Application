import classNames from 'classnames';
import { useEffect, useReducer, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getProducts } from '@/api/catalog';
import { initialState, QUERY_LIMIT, reducerCatalog, sortingTypes, StatusError } from '@/common/utils';
import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs';
import { CategoriesList } from '@/components/categories-list/CategoriesList';
import { CustomSelect } from '@/components/custom-select/CustomSelect';
import { Filters } from '@/components/filters/Filters';
import { Pagination } from '@/components/pagination/Pagination';
import { ProductCard } from '@/components/product-card/ProductCard';
import { Search } from '@/components/search/Search';
import { useCategories } from '@/hooks/useCategories';
import { NoMatch } from '@/pages/no-match/NoMatch';

import styles from './styles.module.scss';

export function Catalog(): JSX.Element {
  const { error, categories: categoriesData, loading } = useCategories();
  const { categoryName, subcategoryName } = useParams<{ categoryName?: string; subcategoryName?: string }>();
  const searchField = useRef<HTMLInputElement>(null);
  const total = useRef(0);
  const [{ products, page, sortType, search, priceFilter, franchises, loadingProducts, categories }, dispatch] =
    useReducer(reducerCatalog, {
      ...initialState,
      categories: { categoryName, subcategoryName },
    });

  if (categories.categoryName !== categoryName || categories.subcategoryName !== subcategoryName) {
    dispatch({ type: 'SET_CATEGORIES', categories: { categoryName, subcategoryName } });
    if (searchField.current?.value) {
      searchField.current.value = '';
    }
  }

  useEffect(() => {
    if (categoriesData) {
      const categoryID = categoriesData?.find((category) => category.key === categories.categoryName);
      const subcategoryID = categoryID?.subcategories.find(
        (subcategory) => subcategory.key === categories.subcategoryName,
      );
      getProducts(page, sortType, priceFilter, franchises, search, categoryID?.id, subcategoryID?.id)
        .then((data) => {
          total.current = data.total;
          data.products.forEach((product) => {
            const category = categoriesData?.find((c) => c.id === product.categoryId);
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
          dispatch({ type: 'SET_PRODUCTS', products: data.products });
        })
        .catch((e: Error) => toast(e.message, { type: 'error' }))
        .finally(() => dispatch({ type: 'SET_LOADING_PRODUCTS', loadingProducts: false }));
    }
  }, [categories, categoriesData, page, sortType, priceFilter, franchises, search]);

  if (error instanceof StatusError && error.statusCode === 404) {
    return <NoMatch />;
  }

  if (loading) {
    return (
      <main className={classNames('main', styles.main)}>
        <div className={styles.infoContainer}>Loading categories...</div>
      </main>
    );
  }

  if (!categoriesData) {
    return (
      <main className={classNames('main', styles.main)}>
        <div className={styles.infoContainer}>No categories data</div>
      </main>
    );
  }

  return (
    <main className="main">
      <div className={styles.topContainer}>
        <CategoriesList parentClass={styles.categoriesList} />
      </div>
      <Breadcrumbs parentClass={styles.breadcrumbs} />
      <div className={styles.container}>
        <section className={styles.product_box}>
          <aside className={styles.filters}>
            <Filters priceFilter={priceFilter} franchises={franchises} dispatch={dispatch} />
          </aside>

          <section className={styles.products_section}>
            <div className={styles.sort_n_search_form}>
              <CustomSelect selectItems={sortingTypes} selectState={sortType} dispatch={dispatch} />
              <Search searchField={searchField} dispatch={dispatch} />
            </div>
            <div className={styles.divider} />
            {loadingProducts ? (
              <div className={styles.infoContainer}>Loading products...</div>
            ) : (
              <>
                <ul className={products.length ? styles.products : `${styles.products} ${styles.products_not_found}`}>
                  {products.map((product) => (
                    <li key={product.id} className={styles.products_item}>
                      <ProductCard product={product} categoryName={categoryName} subcategoryName={subcategoryName} />
                    </li>
                  ))}
                  {!products.length && <li className={styles.not_found}>Products not found</li>}
                </ul>
                {total.current > QUERY_LIMIT && <Pagination page={page} dispatch={dispatch} total={total} />}
              </>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
