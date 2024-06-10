import type { ReactNode } from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getCategories } from '@/api/catalog';
import { NavigationPaths } from '@/common/enums';
import type { CategoriesContextType, CategoriesData } from '@/common/types';
import { StatusError } from '@/common/utils';

export const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

type CategoriesProviderProps = {
  children: ReactNode;
};

export function CategoriesProvider({ children }: CategoriesProviderProps): JSX.Element {
  const [categories, setCategories] = useState<CategoriesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const location = useLocation();

  const validatePath = (categoriesData: CategoriesData, pathname: string): void => {
    const pathParts = pathname.split('/').filter(Boolean);

    if (pathParts.length < 2 || `/${pathParts[0]}` !== NavigationPaths.CATALOG.toString()) {
      return;
    }

    const categoryKey = pathParts[1];
    const category = categoriesData.find((catData) => catData.key === categoryKey);

    if (!category) {
      setError(new StatusError('Category not found', 404));
      return;
    }

    if (pathParts.length > 2) {
      const subcategoryKey = pathParts[2];
      const subcategory = category.subcategories.find((subData) => subData.key === subcategoryKey);

      if (!subcategory) {
        setError(new StatusError('Subcategory not found', 404));
      }
    }
  };

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('An unknown error occurred'));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (categories) {
      validatePath(categories, location.pathname);
    }
  }, [location.pathname, categories]);

  const value = useMemo(() => ({ categories, loading, error }), [categories, loading, error]);

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
}
