import { useNavigate } from 'react-router-dom';

import { useAppStyles } from '@/hooks/useAppStyles';

export function NoMatch(): JSX.Element {
  const navigate = useNavigate();
  const appStyles = useAppStyles();

  return (
    <main className={appStyles.main}>
      <h1>404</h1>
      <p>Sorry, page not found.</p>
      <button type="button" onClick={() => navigate(-1)}>
        Previous page
      </button>
      <button type="button" onClick={() => navigate('/')}>
        Home page
      </button>
    </main>
  );
}
