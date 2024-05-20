import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { CustomButton } from '@/components/custom-button/customButton';

import styles from './styles.module.scss';

export function NoMatch(): JSX.Element {
  const navigate = useNavigate();

  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.text}>The page you requested was not found.</p>
        <div className={styles.buttons}>
          <CustomButton variant="tertiary" onClick={() => navigate(-1)}>
            Previous page
          </CustomButton>
          <CustomButton variant="tertiary" onClick={() => navigate('/')}>
            Home page
          </CustomButton>
        </div>
      </div>
    </main>
  );
}
