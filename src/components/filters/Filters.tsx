import { CustomButton } from '../custom-button/СustomButton';
import { FilterItem } from './filter-item/FilterItem';
import styles from './styles.module.scss';
import type { FilterProps } from './types';

export function Filters({ priceFilter, franchises, countriesF, materialsF, dispatch }: FilterProps): JSX.Element {
  return (
    <>
      <ul className={styles.accordeon}>
        <li>
          <FilterItem priceSlider priceFilter={priceFilter} checkboxesList={[]} stateField="" dispatch={dispatch} />
        </li>
        <li>
          <FilterItem priceSlider={false} checkboxesList={franchises} stateField="franchises" dispatch={dispatch} />
        </li>
        <li>
          <FilterItem priceSlider={false} checkboxesList={countriesF} stateField="countriesF" dispatch={dispatch} />
        </li>
        <li>
          <FilterItem priceSlider={false} checkboxesList={materialsF} stateField="materialsF" dispatch={dispatch} />
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
