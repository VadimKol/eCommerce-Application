import { useContext } from 'react';

import type { CategoriesContextType } from '@/common/types';
import { CategoriesContext } from '@/contexts/сategories-сontext';

export const useCategories = (): CategoriesContextType => {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }

  return context;
};
