import type {
  Address,
  ClientResponse,
  Customer,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { crudAddress, profile } from '@/api/profile.ts';

import { FormChangePassword } from '../../components/form-change-password/FormChangePassword.tsx';
import { FormProfileAddresses } from '../../components/form-profile-addresses/FormProfileAddresses.tsx';
import type { RegisterSchema } from './register-schema.ts';
import { registerSchema } from './register-schema.ts';
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

  const {
    register,
    getFieldState,
    watch,
    trigger,
    setValue,
    formState: { errors, isValid },
  } = useForm<RegisterSchema>({ mode: 'onChange', resolver: zodResolver(registerSchema) });
  const { onChange: onChangeEmail, name: Email, ref: refEmail } = register('email');
  const { onChange: onChangeName, name: Name, ref: refName } = register('name');
  const { onChange: onChangeSurname, name: Surname, ref: refSurname } = register('surname');
  const { onChange: onChangeData, name: Data, ref: refData } = register('age');

  const emailValue = getFieldState('email');
  const nameValue = getFieldState('name');
  const surnameValue = getFieldState('surname');
  const ageValue = getFieldState('age');

  let emailClass = styles.input;
  let nameClass = styles.input;
  let surnameClass = styles.input;
  let ageClass = styles.input;

  if (emailValue.isDirty) {
    emailClass += emailValue.invalid ? ` ${styles.invalid}` : ` ${styles.valid}`;
  }

  if (nameValue.isDirty) {
    nameClass += nameValue.invalid ? ` ${styles.invalid}` : ` ${styles.valid}`;
  }

  if (surnameValue.isDirty) {
    surnameClass += surnameValue.invalid ? ` ${styles.invalid}` : ` ${styles.valid}`;
  }

  if (ageValue.isDirty) {
    ageClass += ageValue.invalid ? ` ${styles.invalid}` : ` ${styles.valid}`;
  }

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
          setValue('name', customer.firstName || '');
          setValue('surname', customer.lastName || '');
          setValue('age', customer.dateOfBirth || '');
          setValue('email', customer.email || '');

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
  }, [setValue]);

  const handleChangeInfo = (): void => {
    const formValues = watch();
    const actions: MyCustomerUpdateAction[] = [
      {
        action: 'changeEmail',
        email: formValues.email,
      },
      {
        action: 'setFirstName',
        firstName: formValues.name,
      },
      {
        action: 'setLastName',
        lastName: formValues.surname,
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth: formValues.age,
      },
    ];

    const setDefaultBody: MyCustomerUpdate = {
      version: personInfo.version,
      actions,
    };

    crudAddress(setDefaultBody)
      .then((response: ClientResponse<Customer>) => {
        if (response) {
          toast('User information successfully changed', { type: 'success' });
          setPersonInfo({
            version: response.body.version || 1,
            firstName: response.body.firstName || '',
            lastName: response.body.lastName || '',
            dateOfBirth: response.body.dateOfBirth || '',
            email: response.body.email || '',
            password: response.body.password || '',
            defaultShippingAddressId: response.body.defaultShippingAddressId || '',
            defaultBillingAddressId: response.body.defaultBillingAddressId || '',
            billingAddressIds: response.body.billingAddressIds || [],
            shippingAddressIds: response.body.shippingAddressIds || [],
          });
          setValue('name', response.body.firstName || '');
          setValue('surname', response.body.lastName || '');
          setValue('age', response.body.dateOfBirth || '');
          setValue('email', response.body.email || '');
        }
      })
      .catch((err: Error) => {
        toast(`Error changing information: ${err.message}`, { type: 'error' });
      });
  };
  const handleMode = async (mode: boolean): Promise<void> => {
    setModeFix(mode);
    await trigger();
  };

  const handleCancel = async (): Promise<void> => {
    setValue('name', personInfo.firstName || '');
    setValue('surname', personInfo.lastName || '');
    setValue('age', personInfo.dateOfBirth || '');
    setValue('email', personInfo.email || '');
    await handleMode(!modeFix);
  };

  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.container}>
        <h1>Profile</h1>
        <div className={styles.profileBlock}>
          <div className={styles.chooseInfoBlock}>
            <button
              type="button"
              onClick={() => handleBlock(true, false, false, false)}
              className={personStatus ? `${styles.chooseInfoItem} ${styles.activeBtn}` : styles.chooseInfoItem}
            >
              Person
            </button>
            <button
              type="button"
              onClick={() => handleBlock(false, true, false, false)}
              className={shippingStatus ? `${styles.chooseInfoItem} ${styles.activeBtn}` : styles.chooseInfoItem}
            >
              Shipping
            </button>
            <button
              type="button"
              onClick={() => handleBlock(false, false, true, false)}
              className={billingStatus ? `${styles.chooseInfoItem} ${styles.activeBtn}` : styles.chooseInfoItem}
            >
              Billing
            </button>
            <button
              type="button"
              onClick={() => handleBlock(false, false, false, true)}
              className={passwordStatus ? `${styles.chooseInfoItem} ${styles.activeBtn}` : styles.chooseInfoItem}
            >
              Password
            </button>
          </div>
          <div className={styles.detailInfoBlock}>
            {personStatus && (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (isValid) {
                    handleChangeInfo();
                  } else {
                    toast('Invalid form', { type: 'error' });
                  }
                }}
                className={styles.form}
              >
                <div className={styles.detailPerson}>
                  <div className={styles.mainFormProfile}>
                    <div className={classNames(styles.inputWithError, styles.bigInput)}>
                      <label htmlFor="name" className={styles.formInput}>
                        <div className={styles.requiredTitle}>Name:</div>
                        <input
                          id="name"
                          className={modeFix ? nameClass : `${nameClass} ${styles.noMode}`}
                          onChange={(event) => {
                            onChangeName(event).catch(() => {});
                          }}
                          ref={refName}
                          name={Name}
                          type="text"
                          placeholder="John"
                          aria-invalid={errors.name || !nameValue.isDirty ? 'true' : 'false'}
                          required
                          readOnly={!modeFix}
                        />
                      </label>
                      {errors.name && (
                        <span role="alert" className={styles.errorMsg}>
                          {errors.name.message}
                        </span>
                      )}
                    </div>
                    <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
                      <label htmlFor="last" className={styles.formInput}>
                        <div className={styles.requiredTitle}>Surname:</div>
                        <input
                          id="last"
                          onChange={(event) => {
                            onChangeSurname(event).catch(() => {});
                          }}
                          ref={refSurname}
                          name={Surname}
                          type="text"
                          className={modeFix ? surnameClass : `${surnameClass} ${styles.noMode}`}
                          aria-invalid={errors.surname || !surnameValue.isDirty ? 'true' : 'false'}
                          placeholder="Smith"
                          required
                          readOnly={!modeFix}
                        />
                      </label>
                      {errors.surname && (
                        <span role="alert" className={styles.errorMsg}>
                          {errors.surname.message}
                        </span>
                      )}
                    </div>

                    <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
                      <label htmlFor="date" className={styles.formInput}>
                        <div className={styles.requiredTitle}>Birthday:</div>
                        <input
                          id="date"
                          onChange={(event) => {
                            onChangeData(event).catch(() => {});
                          }}
                          ref={refData}
                          name={Data}
                          type={modeFix ? 'date' : 'text'}
                          className={modeFix ? ageClass : classNames(ageClass, styles.noMode)}
                          aria-invalid={errors.age || !ageValue.isDirty ? 'true' : 'false'}
                          required
                          readOnly={!modeFix}
                        />
                      </label>
                      {errors.age && (
                        <span role="alert" className={styles.errorMsg}>
                          {errors.age.message}
                        </span>
                      )}
                    </div>

                    <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
                      <label htmlFor="mail" className={styles.formInput}>
                        <div className={styles.requiredTitle}>Email:</div>
                        <input
                          onChange={(event) => {
                            onChangeEmail(event).catch(() => {});
                          }}
                          id="mail"
                          ref={refEmail}
                          type="text"
                          name={Email}
                          className={modeFix ? emailClass : classNames(emailClass, styles.noMode)}
                          autoComplete="email"
                          placeholder="user@example.com"
                          aria-invalid={errors.email || !emailValue.isDirty ? 'true' : 'false'}
                          required
                          readOnly={!modeFix}
                        />
                      </label>
                      {errors.email && (
                        <span role="alert" className={styles.errorMsg}>
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                    <div className={styles.buttonBlock}>
                      <button
                        onClick={() => {
                          handleMode(!modeFix).catch(() => {});
                        }}
                        type={modeFix ? 'button' : 'submit'}
                        className={!isValid && modeFix ? `${styles.button} ${styles.disabled}` : styles.button}
                      >
                        {modeFix ? 'Save' : 'Change'}
                      </button>
                      {modeFix && (
                        <button
                          onClick={() => {
                            handleCancel().catch(() => {});
                          }}
                          type="button"
                          className={styles.button}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
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
                setPersonInfo={setPersonInfo}
                setAddressesShip={setAddressesShip}
                setAddressesBill={setAddressesBill}
              />
            )}
            {billingStatus && (
              <FormProfileAddresses
                version={personInfo.version}
                addresses={addressesBill}
                defaultAddress={personInfo.defaultBillingAddressId}
                isBilling
                setPersonInfo={setPersonInfo}
                setAddressesShip={setAddressesShip}
                setAddressesBill={setAddressesBill}
              />
            )}
            {passwordStatus && (
              <FormChangePassword email={personInfo.email} version={personInfo.version} setPersonInfo={setPersonInfo} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
