import type { ClientResponse, Customer, MyCustomerUpdate } from '@commercetools/platform-sdk';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { crudAddress } from '@/api/client-actions.ts';

import { countries } from '../../constants/constants.ts';
import { type FormValues, registerSchema } from './register-schema.ts';
import styles from './styles.module.scss';
import type { AddressCustom, Country, FormAddresses } from './types.ts';

export function FormProfileAddresses({ version, addresses, defaultAddress, isBilling }: FormAddresses): JSX.Element {
  const [formStatus, setFormStatus] = useState(false);

  const firstCountry: Country = 'US';
  const [selectedCountry, setSelectedCountry] = useState<Country>(firstCountry);
  const [currentAddress, setCurrentAddress] = useState<AddressCustom | null>(null);

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
  }, [currentAddress, setValue, defaultAddress, firstCountry]);

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

  const defaultAddressObject = findAddress(addresses, defaultAddress);

  const handleChange = (addressId: string): void => {
    handleForm(true);
    const changeAddress = findAddress(addresses, addressId);
    setCurrentAddress(changeAddress || null);
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
        }
      })
      .catch((err: Error) => {
        toast(`Error deleting address: ${err.message}`, { type: 'error' });
      });
  };

  const handleSet = (addressId: string): void => {
    const actionType = isBilling ? 'addBillingAddressId' : 'addShippingAddressId';

    const body: MyCustomerUpdate = {
      version,
      actions: [
        {
          action: actionType,
          addressId,
        },
      ],
    };

    crudAddress(body)
      .then((response: ClientResponse<Customer>) => {
        if (response) {
          toast('Address set as default successfully', { type: 'success' });
        }
      })
      .catch((err: Error) => {
        toast(`Error set default address: ${err.message}`, { type: 'error' });
      });
  };

  const saveAddress = (): void => {
    console.log('currentAddress', currentAddress);

    if (currentAddress) {
      const addressTypeAction = isBilling ? 'addBillingAddressId' : 'addShippingAddressId';
      const addressSetDefaultAction = isBilling ? 'setDefaultBillingAddress' : 'setDefaultShippingAddress';

      const body: MyCustomerUpdate = {
        version,
        actions: [
          {
            action: 'addAddress',
            address: currentAddress,
          },
        ],
      };
      console.log('currentAddress', currentAddress);

      crudAddress(body)
        .then((response: ClientResponse<Customer>) => {
          if (response) {
            toast('The address was added successfully', { type: 'success' });
            console.log(response);

            const addedAddress = response.body.addresses;
            console.log(addedAddress);

            if (addedAddress && addedAddress.length > 0) {
              const setDefaultBody2: MyCustomerUpdate = {
                version: response.body.version,
                actions: [
                  {
                    action: addressTypeAction,
                    addressId: addedAddress[addedAddress.length - 1]?.id,
                  },
                  {
                    action: addressSetDefaultAction,
                    addressId: addedAddress[addedAddress.length - 1]?.id,
                  },
                ],
              };
              console.log(setDefaultBody2);

              crudAddress(setDefaultBody2)
                .then(() => {
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
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (isValid) {
      const formValues = watch(); // Get the current form values
      console.log('formValues', formValues);

      setCurrentAddress(formValues as AddressCustom); // Update currentAddress with form values
      saveAddress();
    } else {
      toast('Validation error', { type: 'error' });
    }
  };

  return (
    <div className={styles.detailShipping}>
      <h2>Shipping addresses</h2>
      <div>
        Default shipping address :{' '}
        {defaultAddressObject ? addressToString(defaultAddressObject) : 'No default address found'}
      </div>
      {addresses.map((addressItem: AddressCustom) => (
        <div key={addressItem.id} className={styles.addressItem}>
          {addressToString(addressItem)}
          <div className={styles.addressControl}>
            <button type="button" onClick={() => handleChange(addressItem.id)} className={styles.changeAddress}>
              Change
            </button>
            <button type="button" onClick={() => handleDelete(addressItem.id)} className={styles.deleteAddress}>
              Delete
            </button>
            <button type="button" onClick={() => handleSet(addressItem.id)} className={styles.setAddress}>
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
