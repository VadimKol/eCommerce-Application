export interface ButtonProps {
  children: React.ReactNode;
  type?: 'submit' | 'reset' | 'button';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'cancel';
  onClick?: VoidFunction | (() => Promise<void>);
  className?: string;
  isDisabled?: boolean;
  id?: string;
}
