import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getProducts } from '@/api/client-actions';
import type { Product } from '@/common/types';
import { fandoms, PRICE_FILTER_MAX, PRICE_FILTER_MIN, QUERY_LIMIT, sortingTypes, StatusError } from '@/common/utils';
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
  const [products, setProducts] = useState<Product[]>([]);
  const { categoryName, subcategoryName } = useParams<{ categoryName?: string; subcategoryName?: string }>();
  const [categories, setCategories] = useState({ categoryName, subcategoryName });
  const [page, setPage] = useState(0);
  const [sortType, setSortType] = useState('Sort');
  const [search, setSearch] = useState('');
  const searchField = useRef<HTMLInputElement>(null);

  const total = useRef(0);

  const [priceFilter, setPriceFilter] = useState<[number, number]>([PRICE_FILTER_MIN, PRICE_FILTER_MAX]);
  const [franchises, setFranchises] = useState(Array<boolean>(fandoms.length).fill(false));

  const [loadingProducts, setLoadingProducts] = useState(true);

  if (categories.categoryName !== categoryName || categories.subcategoryName !== subcategoryName) {
    setCategories({ categoryName, subcategoryName });
    setPage(0);
    setSortType('Sort');
    setPriceFilter([PRICE_FILTER_MIN, PRICE_FILTER_MAX]);
    setFranchises(Array(fandoms.length).fill(false));
    setSearch('');
    setLoadingProducts(true);
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
          setProducts(data.products);
        })
        .catch((e: Error) => toast(e.message, { type: 'error' }))
        .finally(() => setLoadingProducts(false));
    }
  }, [categories, categoriesData, page, sortType, priceFilter, franchises, search]);

  if (error instanceof StatusError && error.statusCode === 404) {
    return <NoMatch />;
  }

  if (loading) {
    return (
      <main className={classNames('main', styles.main)}>
        <div className={styles.infoContainer}>Loading products...</div>
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
            <Filters
              priceFilter={priceFilter}
              setPriceFilter={setPriceFilter}
              franchises={franchises}
              setFranchises={setFranchises}
              setPage={setPage}
              setLoadingProducts={setLoadingProducts}
            />
          </aside>
          {loadingProducts ? (
            <div className={styles.infoContainer}>Loading products...</div>
          ) : (
            <section className={styles.products_section}>
              <div className={styles.sort_n_search_form}>
                <Search
                  searchField={searchField}
                  setSearch={setSearch}
                  setPage={setPage}
                  setLoadingProducts={setLoadingProducts}
                />
                <CustomSelect
                  selectItems={sortingTypes}
                  selectState={sortType}
                  setSelectState={setSortType}
                  setLoadingProducts={setLoadingProducts}
                />
              </div>
              <ul className={products.length ? styles.products : `${styles.products} ${styles.products_not_found}`}>
                {products.map((product) => (
                  <li key={product.id} className={styles.products_item}>
                    <ProductCard product={product} categoryName={categoryName} subcategoryName={subcategoryName} />
                  </li>
                ))}
                {!products.length && <li className={styles.not_found}>Products not found</li>}
              </ul>
              {total.current > QUERY_LIMIT && (
                <Pagination page={page} setPage={setPage} setLoadingProducts={setLoadingProducts} total={total} />
              )}
            </section>
          )}
        </section>
      </div>
    </main>
  );
}
