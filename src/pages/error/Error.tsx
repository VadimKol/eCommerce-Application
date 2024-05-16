import { useAppStyles } from '@/hooks/useAppStyles';

export function ErrorPage(): JSX.Element {
  const appStyles = useAppStyles();
  // const error = useRouteError();

  return (
    <main className={appStyles.main}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{/* <i>{error?.statusText || error?.message}</i> */}</p>
    </main>
  );
}
