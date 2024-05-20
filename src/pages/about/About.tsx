import classNames from 'classnames';

import styles from './styles.module.scss';

export function About(): JSX.Element {
  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.container}>
        <h1 className={styles.title}>About page</h1>
        <p className={styles.text}>Under construction...</p>
      </div>
    </main>
  );
}
