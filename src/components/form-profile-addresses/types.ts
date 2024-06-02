export interface FormAddresses {
  version: number;
  addresses: AddressOption[];
  defaultAddress: string;
  isBilling: boolean;
}

export interface AddressOption {
  value: string;
  label: string;
}

export type Country = 'RU' | 'BY' | 'US';
