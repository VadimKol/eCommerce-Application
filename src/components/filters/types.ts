import type { CatalogAction } from '@/common/types';

export interface FilterProps {
  priceFilter: [number, number];
  franchises: boolean[];
  countriesF: boolean[];
  materialsF: boolean[];
  dispatch: React.Dispatch<CatalogAction>;
}
