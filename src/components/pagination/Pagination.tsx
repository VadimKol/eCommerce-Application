import { QUERY_LIMIT } from '@/common/utils';

import styles from './styles.module.scss';
import { type PaginationProps } from './types';

export function Pagination({ page, dispatch, total }: PaginationProps): JSX.Element {
  const PAGE_MAX = Math.floor(total.current / QUERY_LIMIT) + (total.current % QUERY_LIMIT > 0 ? 1 : 0);
  let paginationStyles = styles.pagination_box;
  if (!page) {
    paginationStyles = `${styles.pagination_box_before}`;
  }
  if (!(page + 1 < PAGE_MAX)) {
    paginationStyles = `${styles.pagination_box_after}`;
  }
  return (
    <div className={styles.pagination}>
      <div className={paginationStyles}>
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
          <span>{page + 1}</span>-<span>{PAGE_MAX}</span>
        </div>
        {page + 1 < PAGE_MAX && (
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
    </div>
  );
}
