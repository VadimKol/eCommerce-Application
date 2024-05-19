import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { ActionPaths, NavigationPaths } from '@/common/enums';
import { useAppStyles } from '@/hooks/useAppStyles';

import { countries } from '../../constants/constants.ts';
import styles from './styles.module.scss';

const calculateAge = (birthDate: string): boolean => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age >= 13;
};

const formSchema = z.object({
  email: z
    .string()
    .email(`Email addresses must contain both a local part and a domain name separated by an '@' symbol.`),
  password: z
    .string()
    .min(8, 'Minimum 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one digit')
    .refine(
      (val) => val[0] !== ' ' && val[val.length - 1] !== ' ',
      'Password must not contain leading or trailing whitespace.',
    ),
  name: z.string().regex(/^[A-Za-z]+$/, 'Must contain at least one character and no special characters or numbers'),

  surname: z.string().regex(/^[A-Za-z]+$/, 'Must contain at least one character and no special characters or numbers'),
  streetBill: z.string().regex(/.+/, 'Must contain at least one character'),
  streetShip: z.string().regex(/.+/, 'Must contain at least one character'),
  cityBill: z
    .string()
    .regex(/^[A-Za-z\s]+$/, 'Must contain at least one character and no special characters or numbers'),
  cityShip: z
    .string()
    .regex(/^[A-Za-z\s]+$/, 'Must contain at least one character and no special characters or numbers'),
  postcodeBill: z.string().regex(/^\d{6}$/, 'It must be exactly 6 digits.'),
  postcodeShip: z.string().regex(/^\d{6}$/, 'It must be exactly 6 digits.'),
  age: z
    .string()
    .refine((date) => !Number.isNaN(Date.parse(date)), 'Invalid date format')
    .refine((date) => calculateAge(date), 'You must be at least 13 years old'),
  setAddress: z.boolean(),
  billdefault: z.boolean(),
  shipDefault: z.boolean(),
  apartamentBill: z.string(),
  apartamentShip: z.string(),
  countryBill: z.string(),
  countryShip: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

export function Register(): JSX.Element {
  const navigate = useNavigate();
  const appStyles = useAppStyles();
  const [revealPassword, setRevealPassword] = useState(false);
  const [isBlockVisible, setIsBlockVisible] = useState(false);

  const {
    register,
    getFieldState,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormSchema>({ mode: 'onChange', resolver: zodResolver(formSchema) });
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

  const firstCounrty = countries[0]?.code || 'US';

  const [selectedBillingCountry, setSelectedBillingCountry] = useState(firstCounrty);
  const [selectedShippingCountry, setSelectedShippingCountry] = useState(firstCounrty);

  const handleCountryShippingChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedShippingCountry(event.target.value);
  };

  const countryBillValueWatch = watch('countryBill', 'US');
  const cityBillValueWatch = watch('cityBill');
  const streetBillValueWatch = watch('streetBill');
  const apartamentBillValueWatch = watch('apartamentBill');
  const postcodeBillValueWatch = watch('postcodeBill');
  const checkboxValue = watch('setAddress', false);

  const checkInputValues = (): void => {
    console.log(countryBillValueWatch);

    if (checkboxValue) {
      setValue('countryShip', countryBillValueWatch);
      setValue('cityShip', cityBillValueWatch);
      setValue('streetShip', streetBillValueWatch);
      setValue('apartamentShip', apartamentBillValueWatch);
      setValue('postcodeShip', postcodeBillValueWatch);
      setSelectedShippingCountry(selectedBillingCountry);
    }
  };

  const handleCountryBillingChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedBillingCountry(event.target.value);
    if (checkboxValue) {
      setValue('countryShip', event.target.value);
      setSelectedShippingCountry(event.target.value);
    }
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
  ]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsBlockVisible(!isBlockVisible);
    setValue('setAddress', event.target.checked);
  };

  return (
    <main className={`${appStyles.main || ''} ${styles.registerMain}`}>
      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          navigate(NavigationPaths.HOME);
        }}
      >
        <h2 className={styles.formTitle}>Registration</h2>
        <div className={styles.contextTitle}>
          <h3 className={styles.groupTitle}>Personal</h3>
        </div>
        <div className={styles.groupSection}>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
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
          <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
            <label htmlFor="gender" className={styles.formInput}>
              Gender
              <select id="gender" className={styles.input}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
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
                onChange={handleCountryBillingChange}
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
              Apartment number
              <input id="house_billing" name="apartamentBill" type="text" className={styles.input} placeholder="440" />
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
                value="billdefault"
                type="checkbox"
                name="billdefault"
                className={styles.radioBtn}
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
                    onChange={handleCountryShippingChange}
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
                  Apartment number
                  <input
                    id="house_shipping"
                    name="apartamentShip"
                    type="text"
                    className={styles.input}
                    placeholder="440"
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
                id="shipDefault"
                value="shipDefault"
                type="checkbox"
                name="shipDefault"
                className={styles.radioBtn}
              />
              Set default for Shipping
            </label>
          </div>
          <div className={`${styles.containerCheckBtn}  ${styles.smallInput}`}>
            <label htmlFor="useBillAdress" className={styles.container}>
              <input
                id="default"
                checked={isBlockVisible}
                onChange={handleCheckboxChange}
                value="setAddress"
                type="checkbox"
                name="setAddress"
                className={styles.checkBtn}
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
                type="email"
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
                className={revealPassword ? `${styles.reveal} ${styles.show}` : styles.reveal}
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
          <button
            type="submit"
            id="toCatalog"
            className={!isValid ? `${styles.button} ${styles.disabled}` : styles.button}
          >
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
