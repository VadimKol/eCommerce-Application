import './range_slider.scss';

import MultiRangeSlider, { type ChangeResult } from 'multi-range-slider-react';
import { useState } from 'react';

import { fandoms } from '@/common/utils';

import { CustomButton } from '../custom-button/СustomButton';
import styles from './styles.module.scss';

export function Filters(): JSX.Element {
  const [isPrice, setIsPrice] = useState(false);
  const [isFranchise, setIsFranchise] = useState(false);

  const [minPrice, setminPrice] = useState(250);
  const [maxPrice, setmaxPrice] = useState(750);
  const handleInput = (e: ChangeResult): void => {
    setminPrice(e.minValue);
    setmaxPrice(e.maxValue);
  };

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
            onKeyUp={() => {}}
          >
            <span className={styles.title}>Price</span>
            <span className={isPrice ? `${styles.icon} ${styles.icon_show}` : styles.icon} />
          </div>
          <div className={isPrice ? `${styles.range} ${styles.range_active}` : styles.range}>
            <MultiRangeSlider
              baseClassName="multi-range-slider-blue"
              min={1}
              max={1000}
              step={1}
              minValue={minPrice}
              maxValue={maxPrice}
              onInput={handleInput}
              barLeftColor="#d3d3d3"
              barRightColor="#d3d3d3"
              barInnerColor="var(--primary-color)"
              thumbLeftColor="var(--background-color)"
              thumbRightColor="var(--background-color)"
              ruler={false}
              label={false}
              style={{ border: 'none', boxShadow: 'none' }}
            />
            <div className={styles.prices}>
              <span>£{minPrice}</span>
              <span>£{maxPrice}</span>
            </div>
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
            onKeyUp={() => {}}
          >
            <span className={styles.title}>Franchise</span>
            <span className={isFranchise ? `${styles.icon} ${styles.icon_show}` : styles.icon} />
          </div>
          <ul
            className={isFranchise ? `${styles.checkboxesList} ${styles.checkboxesList_active}` : styles.checkboxesList}
          >
            {fandoms.map((fandom) => (
              <li key={fandom}>
                <label className={styles.checkbox_label} htmlFor={fandom}>
                  <input className={styles.checkbox} type="checkbox" name="" id={fandom} /> {fandom}
                </label>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <CustomButton className={styles.apply}>Apply</CustomButton>
    </>
  );
}
