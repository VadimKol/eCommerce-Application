import type { Address, ClientResponse, Customer } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { profile } from '@/api/client-actions.ts';

import { FormChangePassword } from '../../components/form-change-password/FormChangePassword.tsx';
import { FormProfileAddresses } from '../../components/form-profile-addresses/FormProfileAddresses.tsx';
import styles from './styles.module.scss';
import type { AddressCustom, CustomerProfile } from './types.ts';

export function Profile(): JSX.Element {
  const [personStatus, setPersonStatus] = useState(true);
  const [shippingStatus, setShippingStatus] = useState(false);
  const [billingStatus, setBillingStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);

  const handleBlock = (person: boolean, shipping: boolean, billing: boolean, password: boolean): void => {
    setPersonStatus(person);
    setShippingStatus(shipping);
    setBillingStatus(billing);
    setPasswordStatus(password);
  };

  const [personInfo, setPersonInfo] = useState<CustomerProfile>({
    version: 1,
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    password: '',
    defaultShippingAddressId: 'you may choose',
    defaultBillingAddressId: 'you may choose',
    billingAddressIds: [],
    shippingAddressIds: [],
  });

  const [addressesShip, setAddressesShip] = useState<AddressCustom[]>([]);
  const [addressesBill, setAddressesBill] = useState<AddressCustom[]>([]);
  const [modeFix, setModeFix] = useState(false);

  const handleMode = (mode: boolean): void => {
    setModeFix(mode);
  };

  useEffect(() => {
    const findAddress = (addresses: Address[], id: string): AddressCustom | undefined =>
      (addresses as AddressCustom[]).find((address) => address.id === id);

    const findAllAddressForOptions = (addresses: Address[], addressIds: string[]): AddressCustom[] => {
      const addressOptions: AddressCustom[] = [];
      addressIds.forEach((addressId: string) => {
        const address = findAddress(addresses, addressId);
        if (address) {
          addressOptions.push(address);
        }
      });
      return addressOptions;
    };
    const fetchProfile = async (): Promise<void> => {
      try {
        const response: ClientResponse<Customer> = await profile();
        const customer: Customer = response?.body;

        if (customer) {
          setPersonInfo({
            version: customer.version || 1,
            firstName: customer.firstName || '',
            lastName: customer.lastName || '',
            dateOfBirth: customer.dateOfBirth || '',
            email: customer.email || '',
            password: customer.password || '',
            defaultShippingAddressId: customer.defaultShippingAddressId || '',
            defaultBillingAddressId: customer.defaultBillingAddressId || '',
            billingAddressIds: customer.billingAddressIds || [],
            shippingAddressIds: customer.shippingAddressIds || [],
          });

          const addressOptionsBill = findAllAddressForOptions(customer.addresses, customer.billingAddressIds || []);
          const addressOptionsShip = findAllAddressForOptions(customer.addresses, customer.shippingAddressIds || []);

          setAddressesShip(addressOptionsShip);
          setAddressesBill(addressOptionsBill);
        } else {
          throw new Error('Customer data not available');
        }
      } catch (error) {
        toast('Profile error', { type: 'error' });
      }
    };

    fetchProfile().catch(() => {});
  }, []);

  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.container}>
        <h1>Profile</h1>
        <div className={styles.profileBlock}>
          <div className={styles.chooseInfoBlock}>
            <button
              type="button"
              onClick={() => handleBlock(true, false, false, false)}
              className={styles.chooseInfoItem}
            >
              Person
            </button>
            <button
              type="button"
              onClick={() => handleBlock(false, true, false, false)}
              className={styles.chooseInfoItem}
            >
              Shipping
            </button>
            <button
              type="button"
              onClick={() => handleBlock(false, false, true, false)}
              className={styles.chooseInfoItem}
            >
              Billing
            </button>
            <button
              type="button"
              onClick={() => handleBlock(false, false, false, true)}
              className={styles.chooseInfoItem}
            >
              Password
            </button>
          </div>
          <div className={styles.detailInfoBlock}>
            {personStatus && (
              <form className={styles.form}>
                <div className={styles.detailPerson}>
                  <h2>Person info</h2>
                  <div className={styles.mainFormProfile}>
                    <div className={styles.name_block}>
                      <label htmlFor="name-profile" className={styles.formInput}>
                        Name:
                        <input
                          id="name-profile"
                          placeholder="name"
                          className={modeFix ? styles.input : classNames(styles.input, styles.noMode)}
                          value={`${personInfo.firstName}`}
                        />
                      </label>
                    </div>
                    <div className={styles.surname_block}>
                      <label htmlFor="surname-profile" className={styles.formInput}>
                        Surname:
                        <input
                          id="surname-profile"
                          placeholder="surname"
                          className={modeFix ? styles.input : classNames(styles.input, styles.noMode)}
                          value={`${personInfo.lastName}`}
                        />
                      </label>
                    </div>
                    <div className={styles.date_block}>
                      <label htmlFor="date-profile" className={styles.formInput}>
                        Birthday:
                        <input
                          type={modeFix ? 'date' : 'text'}
                          id="date-profile"
                          className={modeFix ? styles.input : classNames(styles.input, styles.noMode)}
                          value={`${personInfo.dateOfBirth}`}
                        />
                      </label>
                    </div>
                    <div className={styles.email_block}>
                      <label htmlFor="email-profile" className={styles.formInput}>
                        Email:
                        <input
                          id="email-profile"
                          placeholder="email"
                          autoComplete="email"
                          className={modeFix ? styles.input : classNames(styles.input, styles.noMode)}
                          value={`${personInfo.email}`}
                        />
                      </label>
                    </div>
                    <button onClick={() => handleMode(!modeFix)} type="button" className={styles.button}>
                      {modeFix ? 'Save' : 'Change'}
                    </button>
                  </div>
                </div>
              </form>
            )}
            {shippingStatus && (
              <FormProfileAddresses
                version={personInfo.version}
                addresses={addressesShip}
                defaultAddress={personInfo.defaultShippingAddressId}
                isBilling={false}
              />
            )}
            {billingStatus && (
              <FormProfileAddresses
                version={personInfo.version}
                addresses={addressesBill}
                defaultAddress={personInfo.defaultBillingAddressId}
                isBilling
              />
            )}
            {passwordStatus && <FormChangePassword email={personInfo.email} version={personInfo.version} />}
          </div>
        </div>
      </div>
    </main>
  );
}
