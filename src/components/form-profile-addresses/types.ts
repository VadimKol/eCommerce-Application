export interface FormAddresses {
  addresses: AddressOption[];
  defaultAddress: string;
}

export interface AddressOption {
  value: string;
  label: string;
}

export type Country = 'RU' | 'BY' | 'US';
