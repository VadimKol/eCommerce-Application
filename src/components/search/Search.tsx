import styles from './styles.module.scss';
import type { SearchProps } from './types';

export function Search({ searchField, dispatch }: SearchProps): JSX.Element {
  return (
    <form
      className={styles.search_form}
      onSubmit={(e) => {
        e.preventDefault();
        if (typeof searchField.current?.value === 'string') {
          dispatch({ type: 'SET_SEARCH', search: searchField.current?.value.trim() });
        }
      }}
    >
      <div className={styles.search_box}>
        <input id="search" className={styles.search} type="text" placeholder="Search..." ref={searchField} />
        <button type="submit" className={styles.search_button} aria-label="Search-button" />
      </div>
    </form>
  );
}
