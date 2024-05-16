import { useAppStyles } from '@/hooks/useAppStyles';

export function About(): JSX.Element {
  const appStyles = useAppStyles();

  return (
    <main className={appStyles.main}>
      <h1>About page</h1>
      <p>Work in progress...</p>
    </main>
  );
}
