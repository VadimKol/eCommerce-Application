import classNames from 'classnames';

import { ActionPaths } from '@/common/enums';
import { CustomLink } from '@/components/custom-link/СustomLink';

import styles from './styles.module.scss';

export function Home(): JSX.Element {
  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.container}>
        <h1 className={styles.title}>Home page</h1>
        <p className={styles.linksDesc}>Temporary links for cross-check:</p>
        <ul className={styles.linksList}>
          <li>
            <CustomLink to={ActionPaths.LOGIN} variant="tertiary">
              Navigate to login page
            </CustomLink>
          </li>
          <li>
            <CustomLink to={ActionPaths.REGISTER} variant="tertiary">
              Navigate to registration pages
            </CustomLink>
          </li>
        </ul>
      </div>
    </main>
  );
}
