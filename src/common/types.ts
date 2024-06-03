import type { BaseAddress, CustomFieldsDraft, StoreResourceIdentifier } from '@commercetools/platform-sdk';

export interface AuthContextInterface {
  isAuthenticated: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
}

export type CategoriesContextType = {
  categories: CategoriesData | null;
  loading: boolean;
  error: Error | null;
};

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
  readonly middleName?: string;
  /**
   *	Title of the Customer, for example, 'Dr.'.
   *
   *
   */
  readonly title?: string;
  /**
   *	Salutation of the Customer, for example, 'Mr.' or 'Mrs.'.
   *
   *
   */
  readonly salutation?: string;
  /**
   *	Date of birth of the Customer.
   *
   *
   */
  readonly dateOfBirth?: string;
  /**
   *	Company name of the Customer.
   *
   *
   */
  readonly companyName?: string;
  /**
   *	Individual VAT ID of the Customer.
   *
   *
   */
  readonly vatId?: string;
  /**
   *	Addresses of the Customer.
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
  readonly custom?: CustomFieldsDraft;
  /**
   *	Preferred language of the Customer. Must be one of the languages supported by the [Project](ctp:api:type:Project).
   *
   *
   */
  readonly locale?: string;
  /**
   *	Sets the [Stores](ctp:api:type:Store) for the Customer.
   *
   *
   */
  readonly stores?: StoreResourceIdentifier[];
}

export type ProductDetails = {
  name?: string;
  description?: string;
  price?: string | null;
  discountedPrice?: string | null;
  currency?: string | null;
  images?: string[];
  attributes?: { name: string; value: string | number | string[] }[];
  availability?: {
    isOnStock?: boolean | null;
    availableQuantity?: number | null;
  };
};

export type Product = {
  id: string;
  name: string;
  description: string;
  slug: string;
  key: string;
  sku: string;
  quantity: number;
  price: string;
  images: string[];
  categoryId: string;
  slugCategory: string;
  keyCategory: string;
  subcategoryId: string;
  slugSubCategory: string;
  keySubCategory: string;
};

export type Subcategory = {
  id: string;
  name: string;
  slug: string;
  key: string;
  products: Product[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  key: string;
  subcategories: Subcategory[];
};

export type CategoriesData = Category[];

export type UrlParams = {
  categoryName?: string;
  subcategoryName?: string;
  productName?: string;
};

export type LoaderData = {
  category?: Category;
  subcategory?: Subcategory;
  product?: Product;
};
