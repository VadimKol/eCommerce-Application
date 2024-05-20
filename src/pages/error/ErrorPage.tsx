import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import styles from './styles.module.scss';

export function ErrorPage(): JSX.Element {
  const error = useRouteError();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      if (isRouteErrorResponse(error)) {
        setErrorMessage(error.statusText);
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(null);
      }
    }
  }, [error]);

  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.container}>
        <h1 className={styles.header}>Oops!</h1>
        <p className={styles.text}>Sorry, an unexpected error has occurred.</p>
        {errorMessage && (
          <>
            <p className={styles.errorDesc}>Error message:</p>
            <p className={styles.error}>{errorMessage}</p>
          </>
        )}
        <p className={styles.text}>Please try to refresh the page.</p>
      </div>
    </main>
  );
}
