import styles from './styles.module.scss';

export function Register(): JSX.Element {
  return (
    <div className={styles.registerMain}>
      <form className={styles.form} action="">
        <h2>Sign in</h2>
        <div>
          <label htmlFor="name" className={styles.group}>
            First name:
            <input id="name" className={styles.invalid} type="text" />
          </label>
        </div>
        <span className={styles.errorMsg}>Only letters</span>
        <div>
          <label htmlFor="last" className={styles.group}>
            Last name:
            <input id="last" type="text" />
          </label>
        </div>
        <div>
          <label htmlFor="mail" className={styles.group}>
            Email:
            <input id="mail" type="email" />
          </label>
        </div>
        <div>
          <label htmlFor="date" className={styles.group}>
            Birthday:
            <input id="date" type="date" />
          </label>
        </div>
        <div>
          <label htmlFor="adress" className={styles.group}>
            Adress:
            <input id="adress" type="text" />
          </label>
        </div>
        <div>
          <label htmlFor="password" className={styles.group}>
            Password:
            <input id="password" type="password" />
          </label>
        </div>
        <button type="submit" id="toCatalog" className={styles.button}>
          Sign in
        </button>
      </form>
    </div>
  );
}
