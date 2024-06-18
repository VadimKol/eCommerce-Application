import { useState } from 'react';
import { toast } from 'react-toastify';

import { CustomButton } from '../custom-button/СustomButton';
import styles from './styles.module.scss';
import type { ClearModalProps } from './types';

export function ClearModal({ isModal, setIsModal, cartItems, clearFromCart }: ClearModalProps): JSX.Element {
  const [isClearing, setIsClearing] = useState(false);

  const handleClearing = (): void => {
    setIsClearing(true);
    clearFromCart(cartItems.map((cartItem) => cartItem.id))
      .then(() => toast('Successfully cleared', { type: 'success' }))
      .catch(() => toast('Failed to clear', { type: 'error' }))
      .finally(() => setIsModal(false));
  };

  return (
    <div
      className={isModal ? styles.wrapper : `${styles.wrapper} ${styles.wrapper_hidden}`}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget) {
          setIsClearing(false);
        }
      }}
    >
      <div className={styles.modal}>
        <p className={styles.question}>Are you sure you want to clear the cart?</p>
        <div className={styles.buttons}>
          <CustomButton
            aria-label="Cancel"
            onClick={() => setIsModal(false)}
            isDisabled={!isModal}
            className={styles.cancel}
            variant="cancel"
          >
            Cancel
          </CustomButton>
          <CustomButton
            aria-label="Confirm"
            isDisabled={isClearing}
            onClick={handleClearing}
            className={styles.confirm}
            variant="secondary"
          >
            {isClearing ? 'Clearing' : 'Confirm'}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
