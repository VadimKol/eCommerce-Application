import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { ActionPaths } from '@/common/enums';
import { useAppStyles } from '@/hooks/useAppStyles';

import { countries } from '../../constants/constants.ts';
import styles from './styles.module.scss';

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
});

type FormSchema = z.infer<typeof formSchema>;

export function Register(): JSX.Element {
  const navigate = useNavigate();
  const appStyles = useAppStyles();
  const [revealPassword, setRevealPassword] = useState(false);

  const {
    register,
    getFieldState,
    formState: { errors, isValid },
  } = useForm<FormSchema>({ mode: 'onChange', resolver: zodResolver(formSchema) });
  const { onChange: onChangeEmail, name: Email, ref: refEmail } = register('email');
  const { onChange: onChangePassword, name: Password, ref: refPassword } = register('password');
  const emailValue = getFieldState('email');
  const passwordValue = getFieldState('password');

  let emailClass = styles.input;
  let passwordClass = styles.input;

  if (emailValue.isDirty) {
    emailClass += emailValue.invalid ? ` ${styles.invalid}` : ` ${styles.valid}`;
  }

  if (passwordValue.isDirty) {
    passwordClass += passwordValue.invalid ? ` ${styles.invalid}` : ` ${styles.valid}`;
  }

  const firstCounrty = countries[0]?.code || 'US';

  const [selectedBillingCountry, setSelectedBillingCountry] = useState(firstCounrty);
  const [selectedShippingCountry, setSelectedShippingCountry] = useState(firstCounrty);

  const handleCountryBillingChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedBillingCountry(event.target.value);
  };

  const handleCountryShippingChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedShippingCountry(event.target.value);
  };

  return (
    <main className={`${appStyles.main || ''} ${styles.registerMain}`}>
      <form className={styles.form} action="">
        <h2 className={styles.formTitle}>Registration</h2>
        <div className={styles.contextTitle}>
          <h3 className={styles.groupTitle}>Personal</h3>
        </div>
        <div className={styles.groupSection}>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="name" className={styles.formInput}>
              <div className={styles.requiredTitle}>Name</div>
              <input id="name" className={styles.input} type="text" placeholder="John" required />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="last" className={styles.formInput}>
              <div className={styles.requiredTitle}>Surname</div>
              <input id="last" type="text" className={styles.input} placeholder="Smith" required />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
            <label htmlFor="date" className={styles.formInput}>
              <div className={styles.requiredTitle}>Birthday</div>

              <input id="date" type="date" className={styles.input} required />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
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
              <div className={styles.requiredTitle}>Country</div>
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
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="sity_billing" className={styles.formInput}>
              <div className={styles.requiredTitle}>City</div>
              <input id="sity_billing" type="text" className={styles.input} placeholder="New York" required />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="street_billing" className={styles.formInput}>
              <div className={styles.requiredTitle}>Street</div>
              <input id="street_billing" type="text" className={styles.input} placeholder="Clinton St" required />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
            <label htmlFor="house_billing" className={styles.formInput}>
              Apartment number
              <input id="house_billing" type="text" className={styles.input} placeholder="440" />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
            <label htmlFor="postcode_billing" className={styles.formInput}>
              <div className={styles.requiredTitle}>Postal code</div>
              <input id="postcode_billing" type="text" className={styles.input} placeholder="postcode" />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
        </div>
        <div className={styles.contextTitle}>
          <h3 className={styles.groupTitle}>Shipping address</h3>
        </div>
        <div className={styles.groupSection}>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="country_shipping" className={styles.formInput}>
              <div className={styles.requiredTitle}>Country</div>
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
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="sity_shipping" className={styles.formInput}>
              <div className={styles.requiredTitle}>City</div>
              <input id="sity_shipping" type="text" className={styles.input} placeholder="New York" />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="street_shipping" className={styles.formInput}>
              <div className={styles.requiredTitle}>Street</div>
              <input id="street_shipping" type="text" className={styles.input} placeholder="Clinton St" />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
            <label htmlFor="house_shipping" className={styles.formInput}>
              Apartment number
              <input id="house_shipping" type="text" className={styles.input} placeholder="440" />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
            <label htmlFor="postcode_shipping" className={styles.formInput}>
              <div className={styles.requiredTitle}>Postal code</div>
              <input id="postcode_shipping" type="text" className={styles.input} placeholder="postcode" required />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
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
            onClick={() => navigate('/')}
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
