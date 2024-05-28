import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';
import type { SelectProps } from './types';

export function CustomSelect({ selectItems, className, onClick }: SelectProps): JSX.Element {
  const [isSorting, setIsSorting] = useState(false);
  const [sortType, setSortType] = useState('Sort');
  const sortRef = useRef(null);
  const sortListRef = useRef(null);

  const handleOutsideClick = (e: Event): void => {
    if (
      !(
        (sortRef.current && sortRef.current === e.target) ||
        (e.target instanceof HTMLSpanElement && sortRef.current === e.target.parentElement) ||
        (e.target instanceof HTMLLIElement && sortListRef.current === e.target.parentElement)
      )
    ) {
      setIsSorting(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={classNames(className, styles.sort_box)}>
      <div
        className={styles.sort}
        onClick={() => {
          setIsSorting(!isSorting);
        }}
        role="listbox"
        tabIndex={0}
        onKeyUp={() => {}}
        ref={sortRef}
      >
        <span className={styles.sort_title}>{sortType}</span>
        <span className={isSorting ? `${styles.sort_icon} ${styles.sort_icon_show}` : styles.sort_icon} />
      </div>
      <ul
        className={isSorting ? `${styles.sort_list} ${styles.sort_list_show}` : styles.sort_list}
        ref={sortListRef}
        role="listbox"
        onClick={(e) => {
          const sortItem = e.target;
          if (sortItem instanceof HTMLLIElement) {
            setSortType(sortItem.textContent as string);
            setIsSorting(false);
            onClick?.();
          }
        }}
        onKeyUp={() => {}}
      >
        {selectItems.map((selectItem) => (
          <li key={selectItem} className={styles.sort_list_item} role="option" aria-selected>
            {selectItem}
          </li>
        ))}
      </ul>
    </div>
  );
}
