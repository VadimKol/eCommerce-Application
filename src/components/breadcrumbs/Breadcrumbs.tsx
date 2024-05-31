import { Link, useParams } from 'react-router-dom';

import { NavigationPaths } from '@/common/enums';

import styles from './styles.module.scss';

export function Breadcrumbs(): JSX.Element {
  const breadcrumbs = [{ path: NavigationPaths.CATALOG as string, label: 'Catalog' }];

  const { categoryName, subcategoryName, productName } = useParams<{
    categoryName?: string;
    subcategoryName?: string;
    productName?: string;
  }>();

  if (categoryName) {
    let name = categoryName.replace(/-/g, ' ');
    name = name.slice(0, 1).toUpperCase() + name.slice(1, name.length);
    breadcrumbs.push({ path: `${NavigationPaths.CATALOG}/${categoryName}`, label: name });
  }

  if (subcategoryName) {
    let name = subcategoryName.replace(/-/g, ' ');
    name = name.slice(0, 1).toUpperCase() + name.slice(1, name.length);
    breadcrumbs.push({
      path: `${NavigationPaths.CATALOG}/${categoryName}/${subcategoryName}`,
      label: name,
    });
  }

  if (productName) {
    let name = productName.replace(/-/g, ' ');
    name = name.slice(0, 1).toUpperCase() + name.slice(1, name.length);
    breadcrumbs.push({
      path: `${NavigationPaths.CATALOG}/${categoryName}/${subcategoryName}/${productName}`,
      label: name,
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
