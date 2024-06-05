import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';
import type { SelectProps } from './types';

export function CustomSelect({
  selectItems,
  selectState,
  setSelectState,
  className,
  setLoadingProducts,
}: SelectProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const selectBoxRef = useRef(null);
  const ListRef = useRef(null);

  const handleOutsideClick = (e: Event): void => {
    if (
      !(
        (selectBoxRef.current && selectBoxRef.current === e.target) ||
        (e.target instanceof HTMLSpanElement && selectBoxRef.current === e.target.parentElement) ||
        (e.target instanceof HTMLLIElement && ListRef.current === e.target.parentElement)
      )
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={classNames(styles.select, className)}>
      <div
        className={styles.select_box}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        role="listbox"
        tabIndex={0}
        onKeyUp={() => {}}
        ref={selectBoxRef}
      >
        <span className={styles.title}>{selectState}</span>
        <span className={isOpen ? `${styles.icon} ${styles.icon_show}` : styles.icon} />
      </div>
      <ul
        className={isOpen ? `${styles.list} ${styles.list_show}` : styles.list}
        ref={ListRef}
        role="listbox"
        onClick={(e) => {
          const selectItem = e.target;
          if (selectItem instanceof HTMLLIElement) {
            setSelectState(selectItem.textContent as string);
            setIsOpen(false);
            setLoadingProducts(true);
          }
        }}
        onKeyUp={() => {}}
      >
        {selectItems.map((selectItem) => (
          <li key={selectItem} className={styles.list_item} role="option" aria-selected>
            {selectItem}
          </li>
        ))}
      </ul>
    </div>
  );
}
