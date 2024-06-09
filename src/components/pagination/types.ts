import type { CatalogAction } from '@/common/types';

export interface PaginationProps {
  page: number;
  dispatch: React.Dispatch<CatalogAction>;
  total: React.MutableRefObject<number>;
}
