import { type CatalogAction } from '@/common/types';

export interface FilterItemProps {
  priceSlider: boolean;
  checkboxesList: boolean[];
  stateField: string;
  dispatch: React.Dispatch<CatalogAction>;
  priceFilter?: [number, number];
}
