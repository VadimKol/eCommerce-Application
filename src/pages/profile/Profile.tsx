import type { ClientResponse, Customer } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { profile } from '@/api/client-actions.ts';

import styles from './styles.module.scss';

export function Profile(): JSX.Element {
  const [personStatus, setPersonStatus] = useState(true);
  const [shippingStatus, setShippingStatus] = useState(false);
  const [billingStatus, setBillingStatus] = useState(false);

  const handleBlock = (person: boolean, shipping: boolean, billing: boolean): void => {
    setPersonStatus(person);
    setShippingStatus(shipping);
    setBillingStatus(billing);
  };
  interface CustomerProfile {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    password: string;
  }

  const [personInfo, setPersonInfo] = useState<CustomerProfile>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const token: string | null = localStorage.getItem('geek-shop-token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response: ClientResponse<Customer> = await profile(token);
        const customer: Customer = response?.body;

        if (customer) {
          setPersonInfo({
            firstName: customer.firstName || '',
            lastName: customer.lastName || '',
            dateOfBirth: customer.dateOfBirth || '',
            email: customer.email || '',
            password: customer.password || '',
          });
        } else {
          throw new Error('Customer data not available');
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchProfile().catch(() => {});
  }, []);

  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.container}>
        <h1>Profile</h1>
        <form className={styles.form}>
          <div className={styles.chooseInfoBlock}>
            <button type="button" onClick={() => handleBlock(true, false, false)} className={styles.chooseInfoItem}>
              Person
            </button>
            <button type="button" onClick={() => handleBlock(false, true, false)} className={styles.chooseInfoItem}>
              Shipping
            </button>
            <button type="button" onClick={() => handleBlock(false, false, true)} className={styles.chooseInfoItem}>
              Billing
            </button>
          </div>
          <div className={styles.detailInfoBlock}>
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
                <div className={styles.password_block}>
                  <label htmlFor="password-login" className={styles.formInput}>
                    Password:
                    <input
                      id="password-login"
                      placeholder="password"
                      autoComplete="current-password"
                      value={`${personInfo.password}`}
                      className={styles.input}
                    />
                  </label>
                </div>
              </div>
            )}
            {shippingStatus && (
              <div className={styles.detailShipping}>
                <h2>Shipping addresses</h2>
                <table className={styles.table}>
                  <thead className={styles.thead}>
                    <tr>
                      <th id="shipping_id">Id</th>
                      <th id="shipping_country">Country</th>
                      <th id="shipping_city">City</th>
                      <th id="shipping_address">Address</th>
                      <th id="shipping_postal">Postal code</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>US</td>
                      <td>New York City</td>
                      <td>Second Street 15</td>
                      <td>10001</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>US</td>
                      <td>Durham</td>
                      <td>South Road</td>
                      <td>27517</td>
                    </tr>
                    <tr>
                      <td>+</td>
                      <td>
                        <label htmlFor="new-country-profile">
                          <span className="visually-hidden">New country Profile</span>
                          <input id="new-country-profile" />
                        </label>
                      </td>
                      <td>
                        <label htmlFor="new-city-profile">
                          <span className="visually-hidden">New city Profile</span>
                          <input id="new-city-profile" />
                        </label>
                      </td>
                      <td>
                        <label htmlFor="new-street-profile">
                          <span className="visually-hidden">New street Profile</span>
                          <input id="new-street-profile" />
                        </label>
                      </td>
                      <td>
                        <label htmlFor="new-postal-profile">
                          <span className="visually-hidden">New postal code Profile</span>
                          <input id="new-postal-profile" />
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {billingStatus && (
              <div className={styles.detailBilling}>
                <h2>Billing addresses</h2>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th id="shipping_id">Id</th>
                      <th id="shipping_country">Country</th>
                      <th id="shipping_city">City</th>
                      <th id="shipping_address">Address</th>
                      <th id="shipping_postal">Postal code</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>US</td>
                      <td>New York City</td>
                      <td>Second Street 15</td>
                      <td>10001</td>
                    </tr>
                    <tr>
                      <td>+</td>
                      <td>
                        <label htmlFor="new-country-profile">
                          <span className="visually-hidden">New country Profile</span>
                          <input id="new-country-profile" className={styles.newInput} />
                        </label>
                      </td>
                      <td>
                        <label htmlFor="new-city-profile">
                          <span className="visually-hidden">New city Profile</span>
                          <input id="new-city-profile" className={styles.newInput} />
                        </label>
                      </td>
                      <td>
                        <label htmlFor="new-street-profile">
                          <span className="visually-hidden">New street Profile</span>
                          <input id="new-street-profile" className={styles.newInput} />
                        </label>
                      </td>
                      <td>
                        <label htmlFor="new-postal-profile">
                          <span className="visually-hidden">New postal code Profile</span>
                          <input id="new-postal-profile" className={styles.newInput} />
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
