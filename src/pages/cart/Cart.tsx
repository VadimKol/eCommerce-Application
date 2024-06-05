import classNames from 'classnames';

import styles from './styles.module.scss';

export function Cart(): JSX.Element {
  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.container}>
        <h1 className={styles.title}>Cart page</h1>
        <p className={styles.text}>Under construction...</p>
      </div>
    </main>
  );
}
