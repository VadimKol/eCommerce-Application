import type { Address } from '@commercetools/platform-sdk';

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

export interface AddressCustom extends Address {
  id: string;
}
