import classNames from 'classnames';

import { StatusError } from '@/common/utils';
import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs';
import { CategoriesList } from '@/components/categories-list/CategoriesList';
import { useCategories } from '@/hooks/useCategories';
import { NoMatch } from '@/pages/no-match/NoMatch';

import styles from './styles.module.scss';

export function Catalog(): JSX.Element {
  const { error } = useCategories();

  if (error instanceof StatusError && error.statusCode === 404) {
    return <NoMatch />;
  }

  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.topContainer}>
        <CategoriesList parentClass={styles.categoriesList} />
      </div>
      <Breadcrumbs parentClass={styles.breadcrumbs} />
      <div className={styles.container} />
    </main>
  );
}
