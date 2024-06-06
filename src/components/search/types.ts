import type { CatalogAction } from '@/common/types';

export interface SearchProps {
  searchField: React.RefObject<HTMLInputElement>;
  dispatch: React.Dispatch<CatalogAction>;
}
