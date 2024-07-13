import { Link } from 'react-router-dom';

import { NavigationPaths } from '@/common/enums';

import { BurgerMenu } from './burger-menu/BurgerMenu';
import { HeaderLinks } from './links/HeaderLinks';
import styles from './styles.module.scss';

export function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <BurgerMenu />
      <div className={styles.container}>
        <Link className={styles.wordmark} to={NavigationPaths.HOME}>
          Geek store
        </Link>
        <HeaderLinks />
      </div>
    </header>
  );
}
