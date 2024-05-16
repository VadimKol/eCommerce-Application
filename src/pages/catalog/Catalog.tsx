import { useAppStyles } from '@/hooks/useAppStyles';

export function Catalog(): JSX.Element {
  const appStyles = useAppStyles();

  return (
    <main className={appStyles.main}>
      <h1>Catalog page</h1>
      <p>Work in progress...</p>
    </main>
  );
}
