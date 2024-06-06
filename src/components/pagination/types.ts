export interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  setLoadingProducts: (loadingProducts: boolean) => void;
  total: React.MutableRefObject<number>;
}
