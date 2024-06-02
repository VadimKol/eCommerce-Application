import type { ClientResponse, Customer, MyCustomerUpdate } from '@commercetools/platform-sdk';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { crudAddress } from '@/api/client-actions.ts';

import { countries } from '../../constants/constants.ts';
import { type FormValues, registerSchema } from './register-schema.ts';
import styles from './styles.module.scss';
import type { Country, FormAddresses } from './types.ts';

export function FormProfileAddresses({ version, addresses, defaultAddress, isBilling }: FormAddresses): JSX.Element {
  const [formStatus, setFormStatus] = useState(false);

  const handleForm = (show: boolean): void => {
    setFormStatus(show);
  };

  const firstCountry: Country = 'US';
  const [selectedCountry, setSelectedCountry] = useState<Country>(firstCountry);

  const {
    register,
    getFieldState,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: 'onChange', resolver: zodResolver(registerSchema) });

  const { onChange: onChangeCountry, name: Country, ref: refCountry } = register('country');
  const { onChange: onChangeCityAddress, name: CityAddress, ref: refCityAddress } = register('city');
  const { onChange: onChangeStreetAddress, name: StreetAddress, ref: refStreetAddress } = register('street');
  const { onChange: onChangeApartment, name: Apartment, ref: refApartment } = register('apartment');
  const { onChange: onChangePostAddress, name: PostAddress, ref: refPostAddress } = register('postcode');
  const { onChange: onChangeDefault, name: Default, ref: refDefault } = register('default');

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

  const handleCountryChange = async (event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    setSelectedCountry(event.target.value as Country);
    await trigger(['postcode']);
  };

  const handleChange = (): void => {
    handleForm(true);
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
    const actionType = isBilling ? 'setDefaultBillingAddress' : 'setDefaultShippingAddress';

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
    // changePassword(myCustomerChangePassword)
    //   .then((response: ClientResponse<Customer>) => {
    //     if (response) {
    //       toast('Previous password entered correctly', { type: 'success' });
    //     }
    //     console.log(response);
    //   })
    //   .catch((err: Error) => {
    //     toast(`Password error ${err.message}`, { type: 'error' });
    //   });
  };

  return (
    <div className={styles.detailShipping}>
      <h2>Shipping addresses</h2>
      <div>Default shipping address : {defaultAddress}</div>
      {addresses.map((addressItem) => (
        <div key={addressItem.value} className={styles.addressItem}>
          {addressItem.label}
          <div className={styles.addressControl}>
            <button type="button" onClick={() => handleChange()} className={styles.changeAddress}>
              Change
            </button>
            <button type="button" onClick={() => handleDelete(addressItem.value)} className={styles.deleteAddress}>
              Delete
            </button>
            <button type="button" onClick={() => handleSet(addressItem.value)} className={styles.setAddress}>
              Set
            </button>
          </div>
        </div>
      ))}
      <button onClick={() => handleForm(true)} type="button" className={styles.button}>
        Add new address
      </button>
      {formStatus && (
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            if (isValid) {
              saveAddress();
            } else {
              toast('Validation error', { type: 'error' });
            }
          }}
        >
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="country" className={styles.formInput}>
              Country
              <select
                id="country_billing"
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
        </form>
      )}
    </div>
  );
}
