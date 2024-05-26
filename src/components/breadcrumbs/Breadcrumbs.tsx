import { Link, useLoaderData } from 'react-router-dom';

import { NavigationPaths } from '@/common/enums';
import type { LoaderData } from '@/common/types';

import styles from './styles.module.scss';

export function Breadcrumbs(): JSX.Element {
  const data = useLoaderData() as LoaderData;
  const breadcrumbs = [{ path: NavigationPaths.CATALOG as string, label: 'Catalog' }];

  if (data?.category) {
    breadcrumbs.push({ path: `${NavigationPaths.CATALOG}/${data.category.id}`, label: data.category.name });
  }

  if (data?.subcategory) {
    breadcrumbs.push({
      path: `${NavigationPaths.CATALOG}/${data.category?.id}/${data.subcategory.id}`,
      label: data.subcategory.name,
    });
  }

  if (data?.product) {
    breadcrumbs.push({
      path: `${NavigationPaths.CATALOG}/${data.category?.id}/${data.subcategory?.id}/${data.product.id}`,
      label: data.product.name,
    });
  }

  return (
    <nav>
      <ol className={styles.breadcrumbs}>
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.label} className={styles.crumb}>
            {index === breadcrumbs.length - 1 ? <span>{crumb.label}</span> : <Link to={crumb.path}>{crumb.label}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
