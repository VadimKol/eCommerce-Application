import { useState } from 'react';

// import { apiRoot } from '@/api/build-client';
import { fandoms } from '@/common/utils';

import { CustomButton } from '../custom-button/СustomButton';
import { RangeSlider } from '../range-slider/RangeSlider';
import styles from './styles.module.scss';

export function Filters(): JSX.Element {
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
            onKeyUp={() => {}}
          >
            <span className={styles.title}>Price</span>
            <span className={isPrice ? `${styles.icon} ${styles.icon_show}` : styles.icon} />
          </div>
          <div className={isPrice ? `${styles.range} ${styles.range_active}` : styles.range}>
            <RangeSlider min={1} max={150} />
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

/* apiRoot
  .productProjections()
  .search()
  .get({ queryArgs: { sort: 'name.en-US ASC' } })
  .execute()
  .then(console.log)
  .catch(console.error); */
