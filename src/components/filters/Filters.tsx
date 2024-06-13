// import { apiRoot } from '@/api/build-client';

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

/* apiRoot
  .carts()
  .get({ queryArgs: { limit: 500 } })
  .execute()
  .then(console.log)
  .catch(console.error); */
/* apiRoot
  .me()
  .carts()
  .post({
    body: {
      currency: 'USD',
    },
  })
  .execute()
  .then(console.log)
  .catch(console.error); */

// apiRoot.me().activeCart().get().execute().then(console.log).catch(console.error);

/* apiRoot
  .carts()
  .withId({ ID: 'cdc09c1d-4542-42b0-8d03-e86ec05c884d' })
  .delete({ queryArgs: { version: 4 } })
  .execute()
  .then(console.log)
  .catch(console.error); */

/* apiRoot
  .me()
  .carts()
  .replicate()
  .post({
    body: {
      reference: { typeId: 'cart', id: '6206890f-ee33-4185-80e7-0f8406ab1fc4' },
    },
  })
  .execute()
  .then(console.log)
  .catch(console.error); */
