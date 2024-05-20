import type { BaseAddress } from '@commercetools/platform-sdk';

export interface AuthContextInterface {
  isAuthenticated: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
}

export interface Credentials {
  clientId: string;
  clientSecret: string;
}

export interface User {
  username: string;
  password: string;
}

export interface GeekShopCustomerDraft {
  /**
   *	Email address of the Customer that is [unique](/../api/customers-overview#customer-uniqueness) for an entire Project or Store the Customer is assigned to.
   *	It is the mandatory unique identifier of a Customer.
   *
   *
   */
  readonly email: string;
  /**
   *	Password of the Customer.
   *
   *
   */
  readonly password: string;
  /**
   *	Given name (first name) of the Customer.
   *
   *
   */
  readonly firstName?: string;
  /**
   *	Family name (last name) of the Customer.
   *
   *
   */
  readonly lastName?: string;
  /**
   *	Middle name of the Customer.
   *
   *
   */
  readonly dateOfBirth?: string;
  /**
   *	Company name of the Customer.
   *
   *
   */
  readonly addresses?: BaseAddress[];
  /**
   *	Indexes of entries in `addresses` to set as shipping addresses.
   *	The `shippingAddressIds` of the [Customer](ctp:api:type:Customer) will be replaced by these addresses.
   *
   *
   */
  readonly shippingAddresses?: number[];
  /**
   *	Index of the address in the `addresses` array to use as the default shipping address.
   *	The `defaultShippingAddressId` of the Customer will be set to the `id` of that address.
   *
   *
   */
  readonly defaultShippingAddress?: number;
  /**
   *	Indexes of entries in `addresses` to set as billing addresses.
   *	The `billingAddressIds` of the [Customer](ctp:api:type:Customer) will be replaced by these addresses.
   *
   *
   */
  readonly billingAddresses?: number[];
  /**
   *	Index of the address in the `addresses` array to use as the default billing address.
   *	The `defaultBillingAddressId` of the Customer will be set to the `id` of that address.
   *
   *
   */
  readonly defaultBillingAddress?: number;
  /**
   *	Custom Fields for the Customer.
   *
   *
   */
}
