export interface LinkProps {
  children: React.ReactNode;
  to: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'cancel';
  className?: string;
  isDisabled?: boolean;
  id?: string;
}
