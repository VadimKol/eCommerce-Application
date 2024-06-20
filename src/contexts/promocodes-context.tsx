import { createContext, type ReactNode, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { getPromocodes } from '@/api/cart';
import { DEFAULT_LOCALE } from '@/common/utils';

export interface Promocode {
  id: string;
  name: string;
}

export type PromocodesProps = {
  promocodes: Promocode[] | null;
};

export const PromocodesContext = createContext({} as PromocodesProps);

export function PromocodesProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [promocodes, setPromocodes] = useState<Promocode[] | null>(null);

  useEffect(() => {
    getPromocodes()
      .then((response) =>
        setPromocodes(
          response.body.results.map((promocode) => ({
            id: promocode.id,
            name: promocode.name ? promocode.name[DEFAULT_LOCALE] || '' : '',
          })),
        ),
      )
      .catch(() => toast(`Failed to get promocodes`, { type: 'error' }));
  }, []);

  const CartContextValue: PromocodesProps = useMemo(
    () => ({
      promocodes,
    }),
    [promocodes],
  );

  return <PromocodesContext.Provider value={CartContextValue}>{children}</PromocodesContext.Provider>;
}
