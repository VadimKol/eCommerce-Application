import type {
  Address,
  ClientResponse,
  Customer,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { crudAddress } from '@/api/client-actions.ts';

import { countries } from '../../constants/constants.ts';
import { type FormValues, registerSchema } from './register-schema.ts';
import styles from './styles.module.scss';
import type { AddressCustom, Country, FormAddresses } from './types.ts';

export function FormProfileAddresses({
  version,
  addresses,
  defaultAddress,
  isBilling,
  setPersonInfo,
}: FormAddresses): JSX.Element {
  const [formStatus, setFormStatus] = useState(false);

  const firstCountry: Country = 'US';
  const [selectedCountry, setSelectedCountry] = useState<Country>(firstCountry);
  const [currentAddress, setCurrentAddress] = useState<AddressCustom | null>(null);
  const [addressesTable, setAddressesTable] = useState<AddressCustom[]>(addresses);

  const {
    register,
    getFieldState,
    trigger,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: 'onChange', resolver: zodResolver(registerSchema) });

  const { onChange: onChangeCountry, name: Country, ref: refCountry } = register('country');
  const { onChange: onChangeCityAddress, name: CityAddress, ref: refCityAddress } = register('city');
  const { onChange: onChangeStreetAddress, name: StreetAddress, ref: refStreetAddress } = register('street');
  const { onChange: onChangeApartment, name: Apartment, ref: refApartment } = register('apartment');
  const { onChange: onChangePostAddress, name: PostAddress, ref: refPostAddress } = register('postcode');
  const { onChange: onChangeDefault, name: Default, ref: refDefault } = register('default');
  const { onChange: onChangeIdAddress, name: IdAddress, ref: refIdAddress } = register('id');

  const cityValue = getFieldState('city');
  const streetValue = getFieldState('street');
  const postcodeValue = getFieldState('postcode');

  let cityClass = styles.input;
  let streetClass = styles.input;
  let postcodeClass = styles.input;

  if (cityValue.isDirty) {
    cityClass += cityValue.invalid ? ` ${styles.invalid}` : ` ${styles.valid}`;
  }
  if (streetValue.isDirty) {
    streetClass += streetValue.invalid ? ` ${styles.invalid}` : ` ${styles.valid}`;
  }
  if (postcodeValue.isDirty) {
    postcodeClass += postcodeValue.invalid ? ` ${styles.invalid}` : ` ${styles.valid}`;
  }

  const handleForm = (show: boolean): void => {
    setFormStatus(show);
    if (!show) {
      setCurrentAddress(null);
      reset();
    }
  };

  const handleCloseForm = (): void => {
    setFormStatus(false);
    setCurrentAddress(null);
    reset();
  };

  const isValidCountry = (country: string): country is Country => ['RU', 'BY', 'US'].includes(country);

  useEffect(() => {
    if (currentAddress) {
      setValue('id', currentAddress.id);
      setValue('country', isValidCountry(currentAddress.country) ? currentAddress.country : firstCountry);
      setValue('city', currentAddress.city || '');
      setValue('street', currentAddress.streetName || '');
      setValue('apartment', currentAddress.apartment || '');
      setValue('postcode', currentAddress.postalCode || '');
      setValue('default', currentAddress.id === defaultAddress);
    }
  }, [currentAddress, setValue, defaultAddress]);

  const handleCountryChange = async (event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    setSelectedCountry(event.target.value as Country);
    await trigger(['postcode']);
  };

  const addressToString = (address: AddressCustom): string => {
    const house = address.apartment ? `, ${address.apartment}` : '';
    return `${address.country}, ${address.city}, ${address.streetName}${house}, ${address.postalCode}`;
  };

  const findAddress = (addressesArr: AddressCustom[], id: string): AddressCustom | undefined =>
    addressesArr.find((address) => address.id === id);

  const findAllAddressForOptions = (addressArr: Address[], addressIds: string[]): AddressCustom[] => {
    const addressOptions: AddressCustom[] = [];
    addressIds.forEach((addressId: string) => {
      const address = findAddress(addressArr as AddressCustom[], addressId);
      if (address) {
        addressOptions.push(address);
      }
    });
    return addressOptions;
  };

  const defaultAddressObject = findAddress(addressesTable, defaultAddress);

  const handleChange = (addressId: string): void => {
    handleForm(true);
    const changeAddress = findAddress(addressesTable, addressId);
    setCurrentAddress(changeAddress || null);
    if (changeAddress) {
      setSelectedCountry(isValidCountry(changeAddress.country) ? changeAddress.country : firstCountry);
    }
  };

  const handleDelete = (addressId: string): void => {
    const body: MyCustomerUpdate = {
      version,
      actions: [
        {
          action: 'removeAddress',
          addressId,
        },
      ],
    };

    crudAddress(body)
      .then((response: ClientResponse<Customer>) => {
        if (response) {
          toast('Address deleted successfully', { type: 'success' });
          handleCloseForm();
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
          const findAddressArr = isBilling ? response.body.billingAddressIds : response.body.shippingAddressIds;
          const addressOptions = findAllAddressForOptions(response.body.addresses, findAddressArr || []);
          setAddressesTable(addressOptions);
        }
      })
      .catch((err: Error) => {
        toast(`Error deleting address: ${err.message}`, { type: 'error' });
      });
  };

  const handleSet = (addressId: string): void => {
    const addressSetDefaultAction = isBilling ? 'setDefaultBillingAddress' : 'setDefaultShippingAddress';
    let addressForSet: string | undefined;
    if (defaultAddress !== addressId) {
      addressForSet = addressId;
    } else {
      addressForSet = undefined;
    }
    const body: MyCustomerUpdate = {
      version,
      actions: [
        {
          action: addressSetDefaultAction,
          addressId: addressForSet,
        },
      ],
    };

    crudAddress(body)
      .then((response: ClientResponse<Customer>) => {
        if (response) {
          toast('Address set as default successfully', { type: 'success' });
          handleCloseForm();
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
          const findAddressArr = isBilling ? response.body.billingAddressIds : response.body.shippingAddressIds;
          const addressOptions = findAllAddressForOptions(response.body.addresses, findAddressArr || []);
          setAddressesTable(addressOptions);
        }
      })
      .catch((err: Error) => {
        toast(`Error set default address: ${err.message}`, { type: 'error' });
      });
  };

  const createAddress = (newAddress: Address, isDefault: boolean): void => {
    const addressTypeAction = isBilling ? 'addBillingAddressId' : 'addShippingAddressId';
    const addressSetDefaultAction = isBilling ? 'setDefaultBillingAddress' : 'setDefaultShippingAddress';

    const body: MyCustomerUpdate = {
      version,
      actions: [
        {
          action: 'addAddress',
          address: newAddress,
        },
      ],
    };
    crudAddress(body)
      .then((response: ClientResponse<Customer>) => {
        if (response) {
          toast('The address was added successfully', { type: 'success' });
          const addedAddress = response.body.addresses;
          if (addedAddress && addedAddress.length > 0) {
            const lastAddressId = addedAddress[addedAddress.length - 1]?.id;

            if (!lastAddressId) {
              throw new Error('No address ID found for the newly added address.');
            }

            const actions: MyCustomerUpdateAction[] = [
              {
                action: addressTypeAction,
                addressId: lastAddressId,
              },
            ];

            if (isDefault) {
              actions.push({
                action: addressSetDefaultAction,
                addressId: lastAddressId,
              });
            }

            const setDefaultBody2: MyCustomerUpdate = {
              version: response.body.version,
              actions,
            };

            crudAddress(setDefaultBody2)
              .then((responseSet) => {
                handleCloseForm();
                setPersonInfo({
                  version: responseSet.body.version || 1,
                  firstName: responseSet.body.firstName || '',
                  lastName: responseSet.body.lastName || '',
                  dateOfBirth: responseSet.body.dateOfBirth || '',
                  email: responseSet.body.email || '',
                  password: responseSet.body.password || '',
                  defaultShippingAddressId: responseSet.body.defaultShippingAddressId || '',
                  defaultBillingAddressId: responseSet.body.defaultBillingAddressId || '',
                  billingAddressIds: responseSet.body.billingAddressIds || [],
                  shippingAddressIds: responseSet.body.shippingAddressIds || [],
                });
                const findAddressArr = isBilling ? response.body.billingAddressIds : response.body.shippingAddressIds;
                const addressOptions = findAllAddressForOptions(response.body.addresses, findAddressArr || []);
                setAddressesTable(addressOptions);
                toast('The address was added and set as default successfully', { type: 'success' });
              })
              .catch((err: Error) => {
                toast(`An error occurred while setting the default address: ${err.message}`, { type: 'error' });
              });
          }
        }
      })
      .catch((err: Error) => {
        toast(`An error occurred while adding the address: ${err.message}`, { type: 'error' });
      });
  };

  const updateAddress = (idAddress: string, newAddress: Address, isDefault: boolean): void => {
    const addressSetDefaultAction = isBilling ? 'setDefaultBillingAddress' : 'setDefaultShippingAddress';

    const actions: MyCustomerUpdateAction[] = [
      {
        action: 'changeAddress',
        addressId: idAddress,
        address: newAddress,
      },
    ];

    if (isDefault) {
      actions.push({
        action: addressSetDefaultAction,
        addressId: idAddress,
      });
    } else {
      actions.push({
        action: addressSetDefaultAction,
        addressId: undefined,
      });
    }

    const body: MyCustomerUpdate = {
      version,
      actions,
    };

    crudAddress(body)
      .then((response: ClientResponse<Customer>) => {
        if (response) {
          toast('Address updated successfully', { type: 'success' });
          handleCloseForm();
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
          const findAddressArr = isBilling ? response.body.billingAddressIds : response.body.shippingAddressIds;
          const addressOptions = findAllAddressForOptions(response.body.addresses, findAddressArr || []);
          setAddressesTable(addressOptions);
        }
      })
      .catch((err: Error) => {
        toast(`Error updating address: ${err.message}`, { type: 'error' });
      });
  };

  const saveAddress = (): void => {
    const formValues = watch();
    const newAddress: Address = {
      apartment: formValues.apartment,
      city: formValues.city,
      country: formValues.country,
      postalCode: formValues.postcode,
      streetName: formValues.street,
    };
    if (newAddress) {
      if (formValues.id === '') {
        createAddress(newAddress, formValues.default);
      } else {
        updateAddress(formValues.id, newAddress, formValues.default);
      }
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (isValid) {
      saveAddress();
    } else {
      toast('Validation error', { type: 'error' });
    }
  };

  return (
    <div className={styles.detailShipping}>
      <h2>{isBilling ? 'Billing' : 'Shipping'} addresses</h2>
      <div>
        Default {isBilling ? 'billing' : 'shipping'} address :{' '}
        {defaultAddressObject ? addressToString(defaultAddressObject) : 'No default address found'}
      </div>
      {addressesTable.map((addressItem: AddressCustom) => (
        <div key={addressItem.id} className={styles.addressItem}>
          {addressToString(addressItem)}
          <div className={styles.addressControl}>
            <button type="button" onClick={() => handleChange(addressItem.id)} className={styles.changeAddress}>
              Change
            </button>
            <button type="button" onClick={() => handleDelete(addressItem.id)} className={styles.deleteAddress}>
              Delete
            </button>
            <button
              type="button"
              onClick={() => handleSet(addressItem.id)}
              className={addressItem.id === defaultAddress ? styles.setAddress : styles.emptyAddress}
            >
              Set
            </button>
          </div>
        </div>
      ))}
      {!formStatus && (
        <button onClick={() => handleForm(true)} type="button" className={styles.button}>
          Add new address
        </button>
      )}
      {formStatus && (
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.hidden}>
            <label htmlFor="id" className={styles.formInput}>
              idAddress
              <input
                id="id"
                name={IdAddress}
                type="text"
                className={styles.input}
                onChange={(event) => {
                  onChangeIdAddress(event).catch(() => {});
                }}
                ref={refIdAddress}
              />
            </label>
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="country" className={styles.formInput}>
              Country
              <select
                id="country"
                className={styles.input}
                value={selectedCountry}
                onChange={(e) => {
                  onChangeCountry(e).catch(() => {});
                  handleCountryChange(e).catch(() => {});
                }}
                name={Country}
                ref={refCountry}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.title}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="city" className={styles.formInput}>
              <div className={styles.requiredTitle}>City</div>
              <input
                id="city"
                onChange={(event) => {
                  onChangeCityAddress(event).catch(() => {});
                }}
                ref={refCityAddress}
                name={CityAddress}
                type="text"
                className={cityClass}
                placeholder="New York"
                aria-invalid={errors.city || !cityValue.isDirty ? 'true' : 'false'}
                required
              />
            </label>
            {errors.city && (
              <span role="alert" className={styles.errorMsg}>
                {errors.city.message}
              </span>
            )}
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="street" className={styles.formInput}>
              <div className={styles.requiredTitle}>Street</div>
              <input
                id="street"
                onChange={(event) => {
                  onChangeStreetAddress(event).catch(() => {});
                }}
                ref={refStreetAddress}
                name={StreetAddress}
                type="text"
                className={streetClass}
                placeholder="Clinton St"
                aria-invalid={errors.street || !streetValue.isDirty ? 'true' : 'false'}
                required
              />
            </label>
            {errors.street && (
              <span role="alert" className={styles.errorMsg}>
                {errors.street.message}
              </span>
            )}
          </div>
          <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
            <label htmlFor="house" className={styles.formInput}>
              Apartment
              <input
                id="house"
                name={Apartment}
                type="text"
                className={styles.input}
                placeholder="440"
                onChange={(event) => {
                  onChangeApartment(event).catch(() => {});
                }}
                ref={refApartment}
              />
            </label>
          </div>
          <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
            <label htmlFor="postcode" className={styles.formInput}>
              <div className={styles.requiredTitle}>Postal code</div>
              <input
                id="postcode"
                onChange={(event) => {
                  onChangePostAddress(event).catch(() => {});
                }}
                ref={refPostAddress}
                name={PostAddress}
                type="text"
                aria-invalid={errors.postcode || !postcodeValue.isDirty ? 'true' : 'false'}
                className={postcodeClass}
                placeholder="postcode"
              />
            </label>
            {errors.postcode && (
              <span role="alert" className={styles.errorMsg}>
                {errors.postcode.message}
              </span>
            )}
          </div>
          <div className={`${styles.containerRadioBtn}  ${styles.bigInput}`}>
            <label htmlFor="default" className={styles.container}>
              <input
                id="default"
                type="checkbox"
                name={Default}
                className={styles.radioBtn}
                onChange={(e) => {
                  onChangeDefault(e).catch(() => {});
                }}
                ref={refDefault}
              />
              Set default address
            </label>
          </div>
          <button type="submit" className={!isValid ? `${styles.button} ${styles.disabled}` : styles.button}>
            Save
          </button>

          <button type="button" onClick={() => handleCloseForm()} className={styles.button}>
            Close
          </button>
        </form>
      )}
    </div>
  );
}