import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { NavigationPaths } from '@/common/enums';
import type { CategoriesData } from '@/common/types';
import categoriesData from '@/router/mock-products.json';

import styles from './styles.module.scss';

interface Props {
  parentClass?: string | undefined;
  isInsideBurgerMenu?: boolean;
}

export function CategoriesList({ parentClass, isInsideBurgerMenu = false }: Props): JSX.Element {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLUListElement | null>(null);

  const handleCategoryClick = (evt: React.MouseEvent, categoryId: string): void => {
    if (isInsideBurgerMenu) {
      evt.preventDefault();
    } else {
      navigate(`${NavigationPaths.CATALOG}/${categoryId}`);
    }

    if (openCategoryId === categoryId) {
      setOpenCategoryId(null);
      navigate(`${NavigationPaths.CATALOG}/${categoryId}`);
    } else {
      setOpenCategoryId(categoryId);
    }
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenCategoryId(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <ul
      className={classNames(styles.categoriesList, parentClass || '', { [styles.insideMenu!]: isInsideBurgerMenu })}
      ref={menuRef}
    >
      {(categoriesData as CategoriesData).map((category) => {
        const isCurrentCategory =
          location.pathname.includes(`${category.id}/`) || location.pathname.endsWith(category.id);
        const isOpen = openCategoryId === category.id;

        return (
          <li
            key={category.id}
            className={styles.categoryItem}
            onMouseEnter={() => setOpenCategoryId(category.id)}
            onMouseLeave={() => setOpenCategoryId(null)}
          >
            <Link
              to={`${NavigationPaths.CATALOG}/${category.id}`}
              className={classNames(styles.categoryLink, { [styles.categoryLinkCurrent!]: isCurrentCategory })}
              onClick={(evt) => handleCategoryClick(evt, category.id)}
            >
              {category.name}
            </Link>
            {isOpen && (
              <ul className={styles.subcategoriesList}>
                {category.subcategories.map((subcategory) => {
                  const isCurrentSubcategory =
                    location.pathname.includes(`${subcategory.id}/`) || location.pathname.endsWith(subcategory.id);
                  return (
                    <li key={subcategory.id} className={styles.subcategoryItem}>
                      <Link
                        to={`${NavigationPaths.CATALOG}/${category.id}/${subcategory.id}`}
                        className={classNames(styles.subcategoryLink, {
                          [styles.subcategoryLinkCurrent!]: isCurrentSubcategory,
                        })}
                        onClick={() => setOpenCategoryId(null)}
                      >
                        {subcategory.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
