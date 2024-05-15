import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

export function Register(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className={styles.registerMain}>
      <form className={styles.form} action="">
        <h2 className={styles.formTitle}>Registration</h2>
        <h3 className={styles.groupTitle}>Personal</h3>
        <div className={styles.groupSection}>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="name" className={styles.formInput}>
              Name:
              <input id="name" className={`${styles.invalid} ${styles.input}`} type="text" />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="last" className={styles.formInput}>
              Surname:
              <input id="last" type="text" className={styles.input} />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
            <label htmlFor="date" className={styles.formInput}>
              Birthday:
              <input id="date" type="date" className={styles.input} />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
            <label htmlFor="gender" className={styles.formInput}>
              Gender:
              <input id="gender" type="text" className={styles.input} />
            </label>
          </div>
        </div>
        <h3 className={styles.groupTitle}>Billing address</h3>
        <div className={styles.groupSection}>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="adress" className={styles.formInput}>
              Country:
              <input id="adress" type="text" className={styles.input} />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="adress" className={styles.formInput}>
              City:
              <input id="adress" type="text" className={styles.input} />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="adress" className={styles.formInput}>
              Street:
              <input id="adress" type="text" className={styles.input} />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
            <label htmlFor="adress" className={styles.formInput}>
              Apartament number:
              <input id="adress" type="text" className={styles.input} />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
            <label htmlFor="adress" className={styles.formInput}>
              Postal code:
              <input id="adress" type="text" className={styles.input} />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
        </div>
        <h3 className={styles.groupTitle}>Shipping address</h3>
        <div className={styles.groupSection}>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="adress" className={styles.formInput}>
              Country:
              <input id="adress" type="text" className={styles.input} />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="adress" className={styles.formInput}>
              City:
              <input id="adress" type="text" className={styles.input} />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="adress" className={styles.formInput}>
              Street:
              <input id="adress" type="text" className={styles.input} />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
            <label htmlFor="adress" className={styles.formInput}>
              Apartament number:
              <input id="adress" type="text" className={styles.input} />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.smallInput}`}>
            <label htmlFor="adress" className={styles.formInput}>
              Postal code:
              <input id="adress" type="text" className={styles.input} />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
        </div>
        <h3 className={styles.groupTitle}>Login Info</h3>
        <div className={styles.groupSection}>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="mail" className={styles.formInput}>
              Email:
              <input id="mail" type="email" className={styles.input} />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <div className={`${styles.inputWithError}  ${styles.bigInput}`}>
            <label htmlFor="password" className={styles.formInput}>
              Password:
              <input id="password" type="password" className={styles.input} />
            </label>
            <span className={styles.errorMsg}>Only letters</span>
          </div>
          <button type="button" id="toCatalog" className={styles.button} onClick={() => navigate('/')}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
