import { Link, useParams } from 'react-router-dom';

import { NavigationPaths } from '@/common/enums';
import { useCategories } from '@/hooks/useCategories';

import styles from './styles.module.scss';

export function Breadcrumbs({ parentClass }: { parentClass?: string }): JSX.Element | null {
  const breadcrumbs = [{ path: NavigationPaths.CATALOG as string, label: 'Catalog' }];

  const { categoryName, subcategoryName, productName } = useParams<{
    categoryName?: string;
    subcategoryName?: string;
    productName?: string;
  }>();

  const { categories, loading } = useCategories();

  if (loading || !categories) {
    return null;
  }

  if (categoryName) {
    const category = categories.find((cat) => cat.key === categoryName);
    if (!category) {
      return null;
    }
    let name = categoryName.replace(/-/g, ' ');
    name = name.slice(0, 1).toUpperCase() + name.slice(1, name.length);
    breadcrumbs.push({ path: `${NavigationPaths.CATALOG}/${categoryName}`, label: name });

    if (subcategoryName) {
      const subcategory = category.subcategories.find((sub) => sub.key === subcategoryName);
      if (!subcategory) {
        return null;
      }
      let subName = subcategoryName.replace(/-/g, ' ');
      subName = subName.slice(0, 1).toUpperCase() + subName.slice(1, subName.length);
      breadcrumbs.push({
        path: `${NavigationPaths.CATALOG}/${categoryName}/${subcategoryName}`,
        label: subName,
      });

      if (productName) {
        let prodName = productName.replace(/-/g, ' ');
        prodName = prodName.slice(0, 1).toUpperCase() + prodName.slice(1, prodName.length);
        breadcrumbs.push({
          path: `${NavigationPaths.CATALOG}/${categoryName}/${subcategoryName}/${productName}`,
          label: prodName,
        });
      }
    }
  }

  return (
    <nav className={parentClass || ''}>
      <ol className={styles.breadcrumbs}>
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.label} className={styles.crumb}>
            {index === breadcrumbs.length - 1 ? (
              <span className={styles.crumbSpan}>{crumb.label}</span>
            ) : (
              <Link className={styles.crumbLink} to={crumb.path}>
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
