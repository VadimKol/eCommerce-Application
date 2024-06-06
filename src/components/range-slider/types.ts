import type { CatalogAction } from '@/common/types';

export interface RangeSliderProps {
  min: number;
  max: number;
  priceFilter: [number, number];
  dispatch: React.Dispatch<CatalogAction>;
}
