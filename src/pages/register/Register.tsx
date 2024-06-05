import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { tokenCache } from '@/api/build-client.ts';
import { login, signup } from '@/api/client-actions.ts';
import { ActionPaths } from '@/common/enums';
import { useAuth } from '@/hooks/useAuth.ts';

import { countries } from '../../constants/constants.ts';
import { type Country, type RegisterSchema, registerSchema } from './register-schema.ts';
import styles from './styles.module.scss';

export function Register(): JSX.Element {
  const { handleLogin } = useAuth();
  const [revealPassword, setRevealPassword] = useState(false);
  const [isBlockVisible, setIsBlockVisible] = useState(false);

  const {
    register,
    getFieldState,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<RegisterSchema>({ mode: 'onChange', resolver: zodResolver(registerSchema) });
  const { onChange: onChangeEmail, name: Email, ref: refEmail } = register('email');
  const { onChange: onChangePassword, name: Password, ref: refPassword } = register('password');
  const { onChange: onChangeName, name: Name, ref: refName } = register('name');
  const { onChange: onChangeSurname, name: Surname, ref: refSurname } = register('surname');
  const { onChange: onChangeData, name: Data, ref: refData } = register('age');
  const { onChange: onChangeCityAdrressBill, name: CityAdrressBill, ref: refCityAdrressBill } = register('cityBill');
  const { onChange: onChangeCityAdrressShip, name: CityAdrressShip, ref: refCityAdrressShip } = register('cityShip');
  const {
    onChange: onChangeStreetAdrressBill,
    name: StreetAdrressBill,
    ref: refStreetAdrressBill,
  } = register('streetBill');
  const {
    onChange: onChangeStreetAdrressShip,
    name: StreetAdrressShip,
    ref: refStreetAdrressShip,
  } = register('streetShip');
  const {
    onChange: onChangePostAdrressBill,
    name: PostAdrressBill,
    ref: refPostAdrressBill,
  } = register('postcodeBill');
  const {
    onChange: onChangePostAdrressShip,
    name: PostAdrressShip,
    ref: refPostAdrressShip,
  } = register('postcodeShip');
  const { onChange: onChangeBillDefault, name: BillDefault, ref: refBillDefault } = register('billdefault');
  const { onChange: onChangeShipDefault, name: ShipDefault, ref: refShipDefault } = register('shipdefault');
  const { onChange: onChangeApartamentBill, name: ApartamentBill, ref: refApartamentBill } = register('apartamentBill');
  const { onChange: onChangeApartamentShip, name: ApartamentShip, ref: refApartamentShip } = register('apartamentShip');
  const { onChange: onChangeSetAddress, name: SetAddress, ref: refSetAddress } = register('setAddress');
  const { onChange: onChangeCountryBill, name: CountryBill, ref: refCountryBill } = register('countryBill');
  const { onChange: onChangeCountryShip, name: CountryShip, ref: refCountryShip } = register('countryShip');

  const emailValue = getFieldState('email');
  const passwordValue = getFieldState('password');
  const nameValue = getFieldState('name');
  const surnameValue = getFieldState('surname');
  const ageValue = getFieldState('age');
  const cityBillValue = getFieldState('cityBill');
  const streetBillValue = getFieldState('streetBill');
  const cityShipValue = getFieldState('cityShip');
  const streetShipValue = getFieldState('streetShip');

  let emailClass = styles.input;
  let passwordClass = styles.input;
  let nameClass = styles.input;
  let surnameClass = styles.input;
  let ageClass = styles.input;
  let cityBillClass = styles.input;
  let streetBillClass = styles.input;
  let cityShipClass = styles.input;
  let streetShipClass = styles.input;

  if (emailValue.isDirty) {
    emailClass += emailValue.invalid ? ` ${styles.invalid}` : ` ${styles.valid}`;
  }

  if (passwordValue.isDirty) {
    passwordClass += passwordValue.invalid ? ` ${styles.invalid}` : ` ${styles.valid}`;
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

  if (cityBillValue.isDirty) {
    cityBillClass += cityBillValue.invalid ? ` ${styles.invalid}` : ` ${styles.valid}`;
  }

  if (streetBillValue.isDirty) {
    streetBillClass += streetBillValue.invalid ? ` ${styles.invalid}` : ` ${styles.valid}`;
  }

  if (cityShipValue.isDirty) {
    cityShipClass += cityShipValue.invalid ? ` ${styles.invalid}` : ` ${styles.valid}`;
  }

  if (streetShipValue.isDirty) {
    streetShipClass += streetShipValue.invalid ? ` ${styles.invalid}` : ` ${styles.valid}`;
  }

  const firstCounrty: Country = 'US';

  const [selectedBillingCountry, setSelectedBillingCountry] = useState(firstCounrty as Country);
  const [selectedShippingCountry, setSelectedShippingCountry] = useState(firstCounrty as Country);

  const handleCountryShippingChange = async (event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    setSelectedShippingCountry(event.target.value as Country);
    await trigger(['postcodeShip']);
  };

  const countryBillValueWatch = watch('countryBill', 'US');
  const cityBillValueWatch = watch('cityBill');
  const streetBillValueWatch = watch('streetBill');
  const apartamentBillValueWatch = watch('apartamentBill');
  const postcodeBillValueWatch = watch('postcodeBill');
  const checkboxValue = watch('setAddress', false);

  const checkInputValues = useCallback((): void => {
    if (checkboxValue) {
      setValue('countryShip', countryBillValueWatch);
      setValue('cityShip', cityBillValueWatch);
      setValue('streetShip', streetBillValueWatch);
      setValue('apartamentShip', apartamentBillValueWatch);
      setValue('postcodeShip', postcodeBillValueWatch);
      setSelectedShippingCountry(selectedBillingCountry);
    }
  }, [
    checkboxValue,
    setValue,
    countryBillValueWatch,
    cityBillValueWatch,
    streetBillValueWatch,
    apartamentBillValueWatch,
    postcodeBillValueWatch,
    selectedBillingCountry,
  ]);

  const handleCountryBillingChange = async (event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    setSelectedBillingCountry(event.target.value as Country);
    if (checkboxValue) {
      setSelectedShippingCountry(event.target.value as Country);
    }
    await trigger(['postcodeBill']);
  };

  useEffect(() => {
    checkInputValues();
  }, [
    countryBillValueWatch,
    cityBillValueWatch,
    streetBillValueWatch,
    apartamentBillValueWatch,
    postcodeBillValueWatch,
    checkboxValue,
    checkInputValues,
  ]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsBlockVisible(!isBlockVisible);
    setValue('setAddress', event.target.checked);
  };

  const email: string = watch('email');
  const password: string = watch('password');
  const firstName: string = watch('name');
  const lastName: string = watch('surname');
  const dateOfBirth: string = watch('age');

  const addresses = [
    {
      country: selectedBillingCountry,
      city: watch('cityBill'),
      streetName: watch('streetBill'),
      postalCode: watch('postcodeBill'),
      apartment: watch('apartamentBill'),
    },
    {
      country: selectedShippingCountry,
      city: watch('cityShip'),
      streetName: watch('streetShip'),
      postalCode: watch('postcodeShip'),
      apartment: watch('apartamentShip'),
    },
  ];

  if (checkboxValue) {
    addresses.pop();
  }

  const billingAddresses = [0];
  const defaultBillingAddress = watch('billdefault') ? 0 : undefined;
  const shipAddressesIndex = checkboxValue ? 0 : 1;
  const shippingAddresses = [shipAddressesIndex];
  const defaultShippingAddress = watch('shipdefault') ? shipAddressesIndex : undefined;

  const signUpAtForm = async (): Promise<void> => {
    try {
      await signup({
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        addresses,
        shippingAddresses,
        defaultShippingAddress,
        billingAddresses,
        defaultBillingAddress,
      });

      const response = await login({ email, password });
      localStorage.setItem('geek-shop-token', `${tokenCache.get().token}`);
      toast(`${response.body.customer.firstName} registered and logged in`, { type: 'success' });
      handleLogin();
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message, { type: 'error' });
      } else {
        toast('An unknown error occurred.', { type: 'error' });
      }
    }
  };

  return (
    <main className="main">
      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          if (isValid) {
            signUpAtForm().catch(() => {});
          } else {
            toast('Validation error', { type: 'error' });
          }
        }}
      >
        <h2 className={styles.formTitle}>Registration</h2>
        <div className={styles.contextTitle}>
          <h3 className={styles.groupTitle}>Personal</h3>
        </div>
        <div className={styles.groupSection}>
          <div className={classNames(styles.inputWithError, styles.bigInput)}>
            <label htmlFor="name" className={styles.formInput}>
              <div className={styles.requiredTitle}>Name</div>
              <input
                id="name"
                className={nameClass}
                onChange={(event) => {
                  onChangeName(event).catch(() => {});
                }}
                ref={refName}
                name={Name}
                type="text"
                placeholder="John"
                aria-invalid={errors.name || !nameValue.isDirty ? 'true' : 'false'}
                required
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
              <div className={styles.requiredTitle}>Surname</div>
              <input
                id="last"
                onChange={(event) => {
                  onChangeSurname(event).catch(() => {});
                }}
                ref={refSurname}
                name={Surname}
                type="text"
                className={surnameClass}
                aria-invalid={errors.surname || !surnameValue.isDirty ? 'true' : 'false'}
                placeholder="Smith"
                required
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
              <div className={styles.requiredTitle}>Birthday</div>
              <input
                id="date"
                onChange={(event) => {
                  onChangeData(event).catch(() => {});
                }}
                ref={refData}
                name={Data}
                type="date"
                className={ageClass}
                aria-invalid={errors.age || !ageValue.isDirty ? 'true' : 'false'}
                required
              />
            </label>
            {errors.age && (
              <span role="alert" className={styles.errorMsg}>
                {errors.age.message}
              </span>
            )}
          </div>
        </div>
        <div className={styles.contextTitle}>
          <h3 className={styles.groupTitle}>Billing address</h3>
        </div>
        <div className={styles.groupSection}>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="country_billing" className={styles.formInput}>
              Country
              <select
                id="country_billing"
                className={styles.input}
                value={selectedBillingCountry}
                onChange={(e) => {
                  onChangeCountryBill(e).catch(() => {});
                  handleCountryBillingChange(e).catch(() => {});
                }}
                name={CountryBill}
                ref={refCountryBill}
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
            <label htmlFor="sity_billing" className={styles.formInput}>
              <div className={styles.requiredTitle}>City</div>
              <input
                id="sity_billing"
                onChange={(event) => {
                  onChangeCityAdrressBill(event).catch(() => {});
                }}
                ref={refCityAdrressBill}
                name={CityAdrressBill}
                type="text"
                className={cityBillClass}
                placeholder="New York"
                aria-invalid={errors.cityBill || !cityBillValue.isDirty ? 'true' : 'false'}
                required
              />
            </label>
            {errors.cityBill && (
              <span role="alert" className={styles.errorMsg}>
                {errors.cityBill.message}
              </span>
            )}
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="street_billing" className={styles.formInput}>
              <div className={styles.requiredTitle}>Street</div>
              <input
                id="street_billing"
                onChange={(event) => {
                  onChangeStreetAdrressBill(event).catch(() => {});
                }}
                ref={refStreetAdrressBill}
                name={StreetAdrressBill}
                type="text"
                className={streetBillClass}
                placeholder="Clinton St"
                aria-invalid={errors.streetBill || !streetBillValue.isDirty ? 'true' : 'false'}
                required
              />
            </label>
            {errors.streetBill && (
              <span role="alert" className={styles.errorMsg}>
                {errors.streetBill.message}
              </span>
            )}
          </div>
          <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
            <label htmlFor="house_billing" className={styles.formInput}>
              Apartment
              <input
                id="house_billing"
                name={ApartamentBill}
                type="text"
                className={styles.input}
                placeholder="440"
                onChange={(event) => {
                  onChangeApartamentBill(event).catch(() => {});
                }}
                ref={refApartamentBill}
              />
            </label>
          </div>
          <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
            <label htmlFor="postcode_billing" className={styles.formInput}>
              <div className={styles.requiredTitle}>Postal code</div>
              <input
                id="postcode_billing"
                onChange={(event) => {
                  onChangePostAdrressBill(event).catch(() => {});
                }}
                ref={refPostAdrressBill}
                name={PostAdrressBill}
                type="text"
                className={styles.input}
                placeholder="postcode"
              />
            </label>
            {errors.postcodeBill && (
              <span role="alert" className={styles.errorMsg}>
                {errors.postcodeBill.message}
              </span>
            )}
          </div>
          <div className={`${styles.containerRadioBtn}  ${styles.bigInput}`}>
            <label htmlFor="billdefault" className={styles.container}>
              <input
                id="billdefault"
                type="checkbox"
                name={BillDefault}
                className={styles.radioBtn}
                onChange={(e) => {
                  onChangeBillDefault(e).catch(() => {});
                }}
                ref={refBillDefault}
              />
              Set default for Billing
            </label>
          </div>
        </div>
        <div className={styles.contextTitle}>
          <h3 className={styles.groupTitle}>Shipping address</h3>
        </div>
        <div className={styles.optionShipping}>
          {!isBlockVisible && (
            <div className={styles.groupSection}>
              <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
                <label htmlFor="country_shipping" className={styles.formInput}>
                  Country
                  <select
                    id="country_shipping"
                    className={styles.input}
                    value={selectedShippingCountry}
                    onChange={(e) => {
                      onChangeCountryShip(e).catch(() => {});
                      handleCountryShippingChange(e).catch(() => {});
                    }}
                    name={CountryShip}
                    ref={refCountryShip}
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
                <label htmlFor="sity_shipping" className={styles.formInput}>
                  <div className={styles.requiredTitle}>City</div>
                  <input
                    id="sity_shipping"
                    onChange={(event) => {
                      onChangeCityAdrressShip(event).catch(() => {});
                    }}
                    ref={refCityAdrressShip}
                    name={CityAdrressShip}
                    type="text"
                    className={cityShipClass}
                    placeholder="New York"
                    aria-invalid={errors.cityShip || !cityShipValue.isDirty ? 'true' : 'false'}
                    required
                  />
                </label>
                {errors.cityShip && (
                  <span role="alert" className={styles.errorMsg}>
                    {errors.cityShip.message}
                  </span>
                )}
              </div>
              <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
                <label htmlFor="street_shipping" className={styles.formInput}>
                  <div className={styles.requiredTitle}>Street</div>
                  <input
                    id="street_shipping"
                    onChange={(event) => {
                      onChangeStreetAdrressShip(event).catch(() => {});
                    }}
                    ref={refStreetAdrressShip}
                    name={StreetAdrressShip}
                    type="text"
                    className={streetShipClass}
                    placeholder="Clinton St"
                    aria-invalid={errors.streetShip || !streetShipValue.isDirty ? 'true' : 'false'}
                    required
                  />
                </label>
                {errors.streetShip && (
                  <span role="alert" className={styles.errorMsg}>
                    {errors.streetShip.message}
                  </span>
                )}
              </div>
              <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
                <label htmlFor="house_shipping" className={styles.formInput}>
                  Apartment
                  <input
                    id="house_shipping"
                    name={ApartamentShip}
                    type="text"
                    className={styles.input}
                    placeholder="440"
                    onChange={(event) => {
                      onChangeApartamentShip(event).catch(() => {});
                    }}
                    ref={refApartamentShip}
                  />
                </label>
              </div>
              <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
                <label htmlFor="postcode_shipping" className={styles.formInput}>
                  <div className={styles.requiredTitle}>Postal code</div>
                  <input
                    id="postcode_shipping"
                    onChange={(event) => {
                      onChangePostAdrressShip(event).catch(() => {});
                    }}
                    ref={refPostAdrressShip}
                    name={PostAdrressShip}
                    type="text"
                    className={styles.input}
                    placeholder="postcode"
                    required
                  />
                </label>
                {errors.postcodeShip && (
                  <span role="alert" className={styles.errorMsg}>
                    {errors.postcodeShip.message}
                  </span>
                )}
              </div>
            </div>
          )}
          <div className={`${styles.containerRadioBtn}  ${styles.smallInput}`}>
            <label htmlFor="shipdefault" className={styles.container}>
              <input
                id="shipdefault"
                type="checkbox"
                name={ShipDefault}
                className={styles.radioBtn}
                onChange={(e) => {
                  onChangeShipDefault(e).catch(() => {});
                }}
                ref={refShipDefault}
              />
              Set default for Shipping
            </label>
          </div>
          <div className={`${styles.containerCheckBtn}  ${styles.smallInput}`}>
            <label htmlFor="useBillAdress" className={styles.container}>
              <input
                id="default"
                checked={isBlockVisible}
                onChange={(e) => {
                  onChangeSetAddress(e).catch(() => {});
                  handleCheckboxChange(e);
                }}
                value="setAddress"
                type="checkbox"
                name={SetAddress}
                className={styles.checkBtn}
                ref={refSetAddress}
              />
              Set Shipping as Billing
            </label>
          </div>
        </div>
        <div className={styles.contextTitle}>
          <h3 className={styles.groupTitle}>Login info</h3>
        </div>
        <div className={`${styles.groupSection}  ${styles.groupCenter}`}>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="mail" className={styles.formInput}>
              <div className={styles.requiredTitle}>Email</div>
              <input
                onChange={(event) => {
                  onChangeEmail(event).catch(() => {});
                }}
                id="mail"
                ref={refEmail}
                type="text"
                name={Email}
                className={emailClass}
                autoComplete="email"
                placeholder="user@example.com"
                aria-invalid={errors.email || !emailValue.isDirty ? 'true' : 'false'}
                required
              />
            </label>
            {errors.email && (
              <span role="alert" className={styles.errorMsg}>
                {errors.email.message}
              </span>
            )}
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <div className={styles.password_block}>
              <label htmlFor="password" className={styles.formInput}>
                <div className={styles.requiredTitle}>Password</div>
                <input
                  onChange={(event) => {
                    onChangePassword(event).catch(() => {});
                  }}
                  id="password"
                  ref={refPassword}
                  type={revealPassword ? 'text' : 'password'}
                  name={Password}
                  className={passwordClass}
                  autoComplete="new-password"
                  placeholder="password"
                  aria-invalid={errors.password || !passwordValue.isDirty ? 'true' : 'false'}
                  required
                />
              </label>
              <button
                type="button"
                className={revealPassword ? `${styles.reveal} ${styles.hidden}` : styles.reveal}
                aria-label="Reveal"
                onClick={() => setRevealPassword(!revealPassword)}
              />
            </div>
            {errors.password && (
              <span role="alert" className={styles.errorMsg}>
                {errors.password.message}
              </span>
            )}
          </div>
          <button type="submit" className={!isValid ? `${styles.button} ${styles.disabled}` : styles.button}>
            Sign up
          </button>
        </div>
        <p className={styles.registry_link}>
          Already registered? Sign in
          <Link to={ActionPaths.LOGIN} className={styles.link}>
            {` here!`}
          </Link>
        </p>
      </form>
    </main>
  );
}
