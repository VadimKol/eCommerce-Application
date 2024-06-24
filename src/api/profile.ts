import type { ClientResponse, Customer, MyCustomerChangePassword, MyCustomerUpdate } from '@commercetools/platform-sdk';

import { apiRoot } from './build-client';

export function profile(): Promise<ClientResponse<Customer>> {
  return apiRoot.me().get().execute();
}

export function changePassword(myCustomerChangePassword: MyCustomerChangePassword): Promise<ClientResponse<Customer>> {
  return apiRoot.me().password().post({ body: myCustomerChangePassword }).execute();
}

export function crudAddress(MyCustomerUpdate: MyCustomerUpdate): Promise<ClientResponse<Customer>> {
  return apiRoot.me().post({ body: MyCustomerUpdate }).execute();
}
