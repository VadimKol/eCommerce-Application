import styles from './styles.module.scss';
import type { SearchProps } from './types';

export function Search({ searchField, setSearch, setPage, setLoadingProducts }: SearchProps): JSX.Element {
  return (
    <form
      className={styles.search_form}
      onSubmit={(e) => {
        e.preventDefault();
        if (typeof searchField.current?.value === 'string') {
          setSearch(searchField.current?.value.trim());
          setPage(0);
          setLoadingProducts(true);
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
