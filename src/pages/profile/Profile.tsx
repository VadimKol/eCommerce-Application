import type { Address, ClientResponse, Customer } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

import { profile } from '@/api/client-actions.ts';

import { FormChangePassword } from '../../components/form-change-password/FormChangePassword.tsx'; // Adjust the import path
import styles from './styles.module.scss';
import type { AddressCustom, AddressOption, CustomerProfile } from './types.ts';

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

  const addressToString = (address: Address): string => `${address.streetName}, ${address.city}, ${address.country}`;

  const [addressesShip, setAddressesShip] = useState<AddressOption[]>([]);
  const [addressesBill, setAddressesBill] = useState<AddressOption[]>([]);
  const [selectedOptionShip, setSelectedOptionShip] = useState<AddressOption | null>(null);
  const [selectedOptionBill, setSelectedOptionBill] = useState<AddressOption | null>(null);

  useEffect(() => {
    const findAddress = (addresses: Address[], id: string): string => {
      const result = (addresses as AddressCustom[]).find((address) => address.id === id);
      return result ? addressToString(result) : 'you may choose';
    };

    const findAllAddressForOptions = (addresses: Address[], addressIds: string[]): AddressOption[] => {
      const addressOptions: AddressOption[] = [];
      addressIds.forEach((addressId: string) => {
        const address: string = findAddress(addresses, addressId);

        const option: AddressOption = {
          value: addressId,
          label: address,
        };
        addressOptions.push(option);
      });
      return addressOptions;
    };
    const fetchProfile = async (): Promise<void> => {
      try {
        const response: ClientResponse<Customer> = await profile();
        const customer: Customer = response?.body;

        if (customer) {
          const defaultShip = findAddress(customer.addresses, customer.defaultShippingAddressId || '');
          const defaultBill = findAddress(customer.addresses, customer.defaultBillingAddressId || '');

          setPersonInfo({
            version: customer.version || 1,
            firstName: customer.firstName || '',
            lastName: customer.lastName || '',
            dateOfBirth: customer.dateOfBirth || '',
            email: customer.email || '',
            password: customer.password || '',
            defaultShippingAddressId: defaultShip,
            defaultBillingAddressId: defaultBill,
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
          <form className={styles.form}>
            {personStatus && (
              <div className={styles.detailPerson}>
                <h2>Person info</h2>
                <div className={styles.name_block}>
                  <label htmlFor="name-profile" className={styles.formInput}>
                    Name:
                    <input
                      id="name-profile"
                      placeholder="name"
                      className={styles.input}
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
                      className={styles.input}
                      value={`${personInfo.lastName}`}
                    />
                  </label>
                </div>
                <div className={styles.date_block}>
                  <label htmlFor="date-profile" className={styles.formInput}>
                    Birthday:
                    <input type="date" id="date-profile" className={styles.input} value={`${personInfo.dateOfBirth}`} />
                  </label>
                </div>
                <div className={styles.email_block}>
                  <label htmlFor="email-profile" className={styles.formInput}>
                    Email:
                    <input
                      id="email-profile"
                      placeholder="email"
                      autoComplete="email"
                      className={styles.input}
                      value={`${personInfo.email}`}
                    />
                  </label>
                </div>
              </div>
            )}
          </form>
          {shippingStatus && (
            <div className={styles.detailShipping}>
              <h2>Shipping addresses</h2>
              <div>Default shipping address : {personInfo.defaultShippingAddressId}</div>
              <Select options={addressesShip} defaultValue={selectedOptionShip} onChange={setSelectedOptionShip} />
            </div>
          )}
          {billingStatus && (
            <div className={styles.detailBilling}>
              <h2>Billing addresses</h2>
              <div>Default billing address : {personInfo.defaultBillingAddressId}</div>
              <Select options={addressesBill} defaultValue={selectedOptionBill} onChange={setSelectedOptionBill} />
            </div>
          )}
          {passwordStatus && <FormChangePassword email={personInfo.email} version={personInfo.version} />}
        </div>
      </div>
    </main>
  );
}
