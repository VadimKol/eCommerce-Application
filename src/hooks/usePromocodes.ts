import { useContext } from 'react';

import { PromocodesContext, type PromocodesProps } from '@/contexts/promocodes-context';

export const usePromocodes = (): PromocodesProps => {
  const context = useContext(PromocodesContext);

  if (!context) {
    throw new Error('usePromocodes must be used within a PromocodesProvider');
  }

  return context;
};
