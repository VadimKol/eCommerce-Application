import { useNavigate } from 'react-router-dom';

import { NavigationPaths } from '@/common/enums';
import { useAppStyles } from '@/hooks/useAppStyles';
import { useAuth } from '@/hooks/useAuth';

import styles from './styles.module.scss';

export function Login(): JSX.Element {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const appStyles = useAppStyles();

  const onLoginClick = (): void => {
    handleLogin();
    navigate(NavigationPaths.HOME);
  };

  return (
    <main className={`${appStyles.main} ${styles.login}`}>
      <h1>Login</h1>
      <button type="button" onClick={onLoginClick}>
        Login
      </button>
    </main>
  );
}
