export interface SearchProps {
  searchField: React.RefObject<HTMLInputElement>;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setLoadingProducts: (loadingProducts: boolean) => void;
}
