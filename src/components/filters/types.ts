import type { CatalogAction } from '@/common/types';

export interface FilterProps {
  priceFilter: [number, number];
  franchises: boolean[];
  dispatch: React.Dispatch<CatalogAction>;
}
