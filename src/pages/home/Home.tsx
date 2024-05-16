import { Link } from 'react-router-dom';

import { ActionPaths } from '@/common/enums';
import { useAppStyles } from '@/hooks/useAppStyles';

export function Home(): JSX.Element {
  const appStyles = useAppStyles();

  return (
    <main className={appStyles.main}>
      <h1>Home</h1>
      <p>Temporary links for cross-check:</p>
      <ul>
        <li>
          <Link to={ActionPaths.LOGIN}>Navigate to login page</Link>
        </li>
        <li>
          <Link to={ActionPaths.REGISTER}>Navigate to registration page</Link>
        </li>
      </ul>
    </main>
  );
}
