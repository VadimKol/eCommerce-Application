import { type LineItem } from '@commercetools/platform-sdk';

export interface ClearModalProps {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
  cartItems: LineItem[];
  clearFromCart: (lineItems: string[]) => Promise<void>;
}
