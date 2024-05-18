import { Link, useNavigate } from 'react-router-dom';

import { ActionPaths } from '@/common/enums';
import { useAppStyles } from '@/hooks/useAppStyles';

import styles from './styles.module.scss';

export function Register(): JSX.Element {
  const navigate = useNavigate();
  const appStyles = useAppStyles();

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
              Name
              <input id="name" className={styles.input} type="text" placeholder="John" required />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="last" className={styles.formInput}>
              Surname
              <input id="last" type="text" className={styles.input} placeholder="Smith" required />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
            <label htmlFor="date" className={styles.formInput}>
              Birthday
              <input id="date" type="date" className={styles.input} required />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
            <label htmlFor="gender" className={styles.formInput}>
              Gender
              <input id="gender" type="text" className={styles.input} placeholder="male" />
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
              <input id="country_billing" type="text" className={styles.input} placeholder="US" required />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="sity_billing" className={styles.formInput}>
              City
              <input id="sity_billing" type="text" className={styles.input} placeholder="New York" />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="street_billing" className={styles.formInput}>
              Street
              <input id="street_billing" type="text" className={styles.input} placeholder="Clinton St" />
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
              Postal code
              <input id="postcode_billing" type="text" className={styles.input} placeholder="1****" />
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
              Country
              <input id="country_shipping" type="text" className={styles.input} placeholder="US" />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="sity_shipping" className={styles.formInput}>
              City
              <input id="sity_shipping" type="text" className={styles.input} placeholder="New York" />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="street_shipping" className={styles.formInput}>
              Street
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
              Postal code
              <input id="postcode_shipping" type="text" className={styles.input} placeholder="1****" required />
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
              Email
              <input
                id="mail"
                type="email"
                className={styles.input}
                autoComplete="email"
                placeholder="user@example.com"
                required
              />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="password" className={styles.formInput}>
              Password
              <input
                id="password"
                type="password"
                className={styles.input}
                autoComplete="new-password"
                placeholder="password"
                required
              />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <button type="button" id="toCatalog" className={styles.button} onClick={() => navigate('/')}>
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
