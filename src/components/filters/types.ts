export interface FilterProps {
  priceFilter: [number, number];
  setPriceFilter: (priceFilter: [number, number]) => void;
  franchises: boolean[];
  setFranchises: (franchises: boolean[]) => void;
}
