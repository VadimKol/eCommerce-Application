import type { Address } from '@commercetools/platform-sdk';

export interface FormAddresses {
  version: number;
  addresses: AddressCustom[];
  defaultAddress: string;
  isBilling: boolean;
  setPersonInfo: (personInfo: CustomerProfile) => void;
  setAddressesShip: (addressesShip: AddressCustom[]) => void;
  setAddressesBill: (addressesBill: AddressCustom[]) => void;
}

export interface AddressOption {
  value: string;
  label: string;
}
export interface AddressCustom extends Address {
  id: string;
}

export type Country = 'RU' | 'BY' | 'US';

export interface CustomerProfile {
  version: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  password: string;
  billingAddressIds: string[];
  shippingAddressIds: string[];
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
}
