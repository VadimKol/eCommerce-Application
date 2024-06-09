import { useState } from 'react';

import { fandoms, PRICE_FILTER_MAX, PRICE_FILTER_MIN } from '@/common/utils';

import { CustomButton } from '../custom-button/СustomButton';
import { RangeSlider } from '../range-slider/RangeSlider';
import styles from './styles.module.scss';
import type { FilterProps } from './types';

export function Filters({ priceFilter, franchises, dispatch }: FilterProps): JSX.Element {
  const [isPrice, setIsPrice] = useState(false);
  const [isFranchise, setIsFranchise] = useState(false);

  return (
    <>
      <ul className={styles.accordeon}>
        <li>
          <div
            className={styles.item}
            onClick={() => {
              setIsPrice(!isPrice);
            }}
            role="listbox"
            tabIndex={0}
          >
            <span className={styles.title}>Price</span>
            <span className={isPrice ? `${styles.icon} ${styles.icon_show}` : styles.icon} />
          </div>
          <div className={isPrice ? `${styles.range} ${styles.range_active}` : styles.range}>
            <RangeSlider min={PRICE_FILTER_MIN} max={PRICE_FILTER_MAX} priceFilter={priceFilter} dispatch={dispatch} />
          </div>
        </li>
        <li>
          <div
            className={styles.item}
            onClick={() => {
              setIsFranchise(!isFranchise);
            }}
            role="listbox"
            tabIndex={0}
          >
            <span className={styles.title}>Franchise</span>
            <span className={isFranchise ? `${styles.icon} ${styles.icon_show}` : styles.icon} />
          </div>
          <ul
            className={isFranchise ? `${styles.checkboxesList} ${styles.checkboxesList_active}` : styles.checkboxesList}
          >
            {fandoms.map((fandom, index) => (
              <li key={fandom}>
                <label className={styles.checkbox_label} htmlFor={fandom}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    id={fandom}
                    onChange={() => {
                      const temp = [...franchises];
                      temp[index] = !temp[index];
                      dispatch({ type: 'SET_FRANCHISES', franchises: temp });
                    }}
                    checked={franchises[index]}
                  />
                  {` ${fandom}`}
                </label>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <CustomButton
        className={styles.reset}
        onClick={() => {
          dispatch({ type: 'RESET_FILTERS' });
        }}
      >
        Reset
      </CustomButton>
    </>
  );
}
