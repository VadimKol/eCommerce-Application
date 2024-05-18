import type { ClientResponse, CustomerSignin, CustomerSignInResult } from '@commercetools/platform-sdk';

import { apiRoot } from '@/pages/_app/App';

export function login(customerSignin: CustomerSignin): Promise<ClientResponse<CustomerSignInResult>> {
  return apiRoot.api
    .me()
    .login()
    .post({
      body: customerSignin,
    })
    .execute();
}
