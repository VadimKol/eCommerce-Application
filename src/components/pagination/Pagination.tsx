import { QUERY_LIMIT } from '@/common/utils';

import styles from './styles.module.scss';
import { type PaginationProps } from './types';

export function Pagination({ page, dispatch, total }: PaginationProps): JSX.Element {
  return (
    <div className={styles.pagination}>
      {Boolean(page) && (
        <button
          type="button"
          aria-label="Left"
          className={styles.pag_left}
          onClick={() => {
            dispatch({ type: 'SET_PAGE', page: page - 1 });
          }}
        />
      )}
      <div className={styles.pages}>
        <span>{page + 1}</span>-
        <span>{Math.floor(total.current / QUERY_LIMIT) + (total.current % QUERY_LIMIT > 0 ? 1 : 0)}</span>
      </div>
      {page + 1 < Math.floor(total.current / QUERY_LIMIT) + (total.current % QUERY_LIMIT > 0 ? 1 : 0) && (
        <button
          type="button"
          aria-label="Right"
          className={styles.pag_right}
          onClick={() => {
            dispatch({ type: 'SET_PAGE', page: page + 1 });
          }}
        />
      )}
    </div>
  );
}
