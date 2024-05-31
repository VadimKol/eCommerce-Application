import type { Address } from '@commercetools/platform-sdk';

export interface CustomerProfile {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  password: string;
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
}

export interface AddressOption {
  value: string;
  label: string;
}

export interface AddressCustom extends Address {
  id: string;
}
