import type { CatalogAction } from '@/common/types';

export interface SelectProps {
  selectItems: string[];
  selectState: string;
  dispatch: React.Dispatch<CatalogAction>;
  className?: string;
}
