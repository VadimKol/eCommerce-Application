export interface SelectProps {
  selectItems: string[];
  selectState: string;
  setSelectState: (selectState: string) => void;
  className?: string;
}
