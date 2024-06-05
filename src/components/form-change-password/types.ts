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

export interface FormChangePasswordProps {
  email: string;
  version: number;
  setPersonInfo: (personInfo: CustomerProfile) => void;
}
