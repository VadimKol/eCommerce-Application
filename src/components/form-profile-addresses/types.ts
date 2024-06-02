import type { Address } from '@commercetools/platform-sdk';

export interface FormAddresses {
  version: number;
  addresses: AddressCustom[];
  defaultAddress: string;
  isBilling: boolean;
}

export interface AddressOption {
  value: string;
  label: string;
}
export interface AddressCustom extends Address {
  id: string;
}

export type Country = 'RU' | 'BY' | 'US';
