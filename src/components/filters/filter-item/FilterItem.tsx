import { useState } from 'react';

import { countriesFilter, fandoms, materials, PRICE_FILTER_MAX, PRICE_FILTER_MIN } from '@/common/utils';
import { RangeSlider } from '@/components/range-slider/RangeSlider';

import styles from './styles.module.scss';
import { type FilterItemProps } from './types';

export function FilterItem({
  priceSlider,
  checkboxesList,
  stateField,
  dispatch,
  priceFilter = [PRICE_FILTER_MIN, PRICE_FILTER_MAX],
}: FilterItemProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  let stylesActive: string | undefined;
  let dispatchType = '';
  let list: string[] = [];
  let title = priceSlider ? 'Price' : '';
  switch (stateField) {
    case 'franchises': {
      stylesActive = styles.fandoms_active;
      dispatchType = 'SET_FRANCHISES';
      list = fandoms;
      title = 'Franchise';
      break;
    }
    case 'countriesF': {
      stylesActive = styles.countries_active;
      dispatchType = 'SET_COUNTRIES';
      list = countriesFilter;
      title = 'Country';
      break;
    }
    case 'materialsF': {
      stylesActive = styles.materials_active;
      dispatchType = 'SET_MATERIALS';
      list = materials;
      title = 'Material';
      break;
    }
    default:
      break;
  }
  return (
    <>
      <div
        className={styles.item}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        role="listbox"
        tabIndex={0}
      >
        <span className={styles.title}>{title}</span>
        <span className={isOpen ? `${styles.icon} ${styles.icon_show}` : styles.icon} />
      </div>
      {priceSlider ? (
        <div className={isOpen ? `${styles.range} ${styles.range_active}` : styles.range}>
          <RangeSlider min={PRICE_FILTER_MIN} max={PRICE_FILTER_MAX} priceFilter={priceFilter} dispatch={dispatch} />
        </div>
      ) : (
        <ul className={isOpen ? `${styles.checkboxesList} ${stylesActive}` : styles.checkboxesList}>
          {list.map((item, index) => (
            <li key={`${item}Filter`}>
              <label className={styles.checkbox_label} htmlFor={item}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  id={item}
                  onChange={() => {
                    const temp = [...checkboxesList];
                    temp[index] = !temp[index];
                    dispatch({ type: dispatchType, [`${stateField}`]: temp });
                  }}
                  checked={checkboxesList[index]}
                />
                {` ${item}`}
              </label>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
