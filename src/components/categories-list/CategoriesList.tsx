import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { NavigationPaths } from '@/common/enums';
import { NavLink } from '@/components/nav-link/NavLink';
import { useCategories } from '@/hooks/useCategories';

import styles from './styles.module.scss';

interface Props {
  parentClass?: string | undefined;
  isInsideBurgerMenu?: boolean;
}

export function CategoriesList({ parentClass, isInsideBurgerMenu = false }: Props): JSX.Element {
  const [openCategoryKey, setOpenCategoryKey] = useState<string | null>(null);
  const [isOpaque, setIsOpaque] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLUListElement | null>(null);
  const { categories, loading } = useCategories();

  const handleCategoryClick = (evt: React.MouseEvent, categoryKey: string): void => {
    evt.preventDefault();

    if (openCategoryKey === categoryKey) {
      navigate(`${NavigationPaths.CATALOG}/${categoryKey}`);
      if (isInsideBurgerMenu) {
        setTimeout(() => setOpenCategoryKey(null), 500);
      } else {
        setOpenCategoryKey(null);
      }
    } else {
      setOpenCategoryKey(categoryKey);
    }
  };

  useEffect(() => {
    if (!loading && categories) {
      setTimeout(() => setIsOpaque(true), 0);
    }
  }, [loading, categories]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !target.classList.contains(styles.categoryLink!) &&
        !isInsideBurgerMenu
      ) {
        setOpenCategoryKey(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isInsideBurgerMenu]);

  if (loading) {
    return <div className={styles.filler}>Loading categories</div>;
  }

  if (!categories) {
    return <div className={styles.filler}>No categories fetched</div>;
  }

  return (
    <ul
      className={classNames(
        styles.categoriesList,
        parentClass || '',
        { [styles.insideMenu!]: isInsideBurgerMenu },
        { [styles.opaque!]: isOpaque },
      )}
      ref={menuRef}
    >
      {categories.map((category) => {
        const isCurrentCategory =
          location.pathname.includes(`/${category.key}/`) || location.pathname.endsWith(`/${category.key}`);
        const isOpen = openCategoryKey === category.key;

        return (
          <li
            key={category.key}
            className={styles.categoryItem}
            onMouseEnter={() => setOpenCategoryKey(category.key)}
            onMouseLeave={() => setOpenCategoryKey(null)}
          >
            <Link
              to={`${NavigationPaths.CATALOG}/${category.key}`}
              className={classNames(styles.categoryLink, { [styles.categoryLinkCurrent!]: isCurrentCategory })}
              onClick={(evt) => handleCategoryClick(evt, category.key)}
            >
              {category.name}
            </Link>
            {isOpen && (
              <ul className={classNames(styles.subcategoriesList, { [styles.subcategoriesListOpen!]: isOpen })}>
                {category.subcategories.map((subcategory) => {
                  const isCurrentSubcategory =
                    location.pathname.includes(`/${subcategory.key}/`) ||
                    location.pathname.endsWith(`/${subcategory.key}`);
                  return (
                    <li key={subcategory.key} className={styles.subcategoryItem}>
                      <NavLink
                        to={`${NavigationPaths.CATALOG}/${category.key}/${subcategory.key}`}
                        label={subcategory.name}
                        className={classNames(styles.subcategoryLink, {
                          [styles.subcategoryLinkCurrent!]: isCurrentSubcategory,
                        })}
                        onClick={() => {
                          if (!isInsideBurgerMenu) {
                            setOpenCategoryKey(null);
                          }
                        }}
                      />
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
