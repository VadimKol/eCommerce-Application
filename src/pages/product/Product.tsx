import classNames from 'classnames';

import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs';
import { CategoriesList } from '@/components/categories-list/CategoriesList';

import DetailedProduct from './detailed-product/DetailedProduct';
import styles from './styles.module.scss';

export function Product(): JSX.Element {
  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.topContainer}>
        <CategoriesList parentClass={styles.categoriesList} />
      </div>
      <Breadcrumbs parentClass={styles.breadcrumbs} />
      <div className={styles.container}>
        <DetailedProduct />
      </div>
    </main>
  );
}
