import classNames from 'classnames';

import styles from './styles.module.scss';

export function Home(): JSX.Element {
  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.container}>
        <h1 className={styles.title}>Home page</h1>
        <p className={styles.linksDesc}>Under construction...</p>
      </div>
    </main>
  );
}
