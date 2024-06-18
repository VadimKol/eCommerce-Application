import { type FormEvent, useRef } from 'react';
import { toast } from 'react-toastify';

import { Discounts } from '@/common/utils';
import { CustomButton } from '@/components/custom-button/СustomButton';

import styles from './styles.module.scss';
import type { PromocodesProps } from './types';

export function Promocodes({ addPromocode, promocodes, cart }: PromocodesProps): JSX.Element {
  const promocodeInput = useRef<HTMLInputElement>(null);

  const appliedPromocodes = promocodes
    .filter(({ id }) => cart.discountCodes.map(({ discountCode }) => discountCode.id).includes(id))
    .map(({ name }) => name);

  const handlePromocode = (e: FormEvent): void => {
    e.preventDefault();
    if (promocodeInput.current?.value?.trim()) {
      const promocode = promocodeInput.current.value.trim();
      promocodeInput.current.value = '';
      if (!appliedPromocodes.includes(promocode)) {
        addPromocode(promocode)
          .then(() => toast('Successfully added Promocode', { type: 'success' }))
          .catch((error: Error) => toast(error.message, { type: 'error' }));
      } else {
        toast(`The discount code '${promocode}' already applied`, { type: 'error' });
      }
    }
  };

  return (
    <>
      {appliedPromocodes.map((promo) => (
        <p key={promo} className={styles.promocodes}>
          <span>{`"${promo}"`}</span>
          <span>{Discounts.find((item) => item.name === promo)?.desc}</span>
        </p>
      ))}
      <form className={styles.promobox} onSubmit={handlePromocode}>
        <p className={styles.promo_desc}>Enter promocode</p>
        <div className={styles.promoblock}>
          <input type="text" id="promocode" placeholder="Promocode" className={styles.promocode} ref={promocodeInput} />
          <CustomButton type="submit" aria-label="Promo-button">
            Apply
          </CustomButton>
        </div>
      </form>
    </>
  );
}
