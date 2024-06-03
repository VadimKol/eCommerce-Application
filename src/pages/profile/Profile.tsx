import classNames from 'classnames';

import styles from './styles.module.scss';

export function Profile(): JSX.Element {
  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.container}>
        <h1 className={styles.title}>Profile page</h1>
        <p className={styles.text}>Under construction...</p>
      </div>
    </main>
  );
}
