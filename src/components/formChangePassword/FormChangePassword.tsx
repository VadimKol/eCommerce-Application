import type { ClientResponse, Customer, MyCustomerChangePassword } from '@commercetools/platform-sdk';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { tokenCache } from '@/api/build-client';
import { changePassword, login } from '@/api/client-actions.ts';

import styles from './styles.module.scss';
import type { FormChangePasswordProps } from './types.ts';

export function FormChangePassword({ email, version }: FormChangePasswordProps): JSX.Element {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const changePasswordHandle = (): void => {
    const myCustomerChangePassword: MyCustomerChangePassword = {
      version,
      currentPassword,
      newPassword,
    };
    changePassword(myCustomerChangePassword)
      .then((response: ClientResponse<Customer>) => {
        if (response) {
          toast('Previous password entered correctly', { type: 'success' });
        }
      })
      .then(() => {
        const password = myCustomerChangePassword.newPassword;

        login({ email, password })
          .then(() => {
            localStorage.setItem('geek-shop-token', `${tokenCache.get().token}`);
            toast(`Password change was successful`, { type: 'success' });
          })
          .catch(() => {
            toast('An error occurred when changing your password, please try again', { type: 'error' });
          });
      })
      .catch((err: Error) => {
        toast(`Password error ${err.message}`, { type: 'error' });
      });
  };

  return (
    <div className={styles.blockPassword}>
      <h2>Change password</h2>
      <div>
        To change your password, enter your current password and the new one. Once the current password has been
        successfully verified, it will be replaced with a new password.
      </div>
      <label htmlFor="password-was-login" className={styles.formInput}>
        Current password:
        <input
          id="password-was-login"
          placeholder="password"
          autoComplete="current-password"
          className={styles.input}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </label>
      <label htmlFor="password-login" className={styles.formInput}>
        New password:
        <input
          id="password-login"
          placeholder="new password"
          autoComplete="new-password"
          className={styles.input}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <button onClick={changePasswordHandle} type="button" className={styles.changeInfo}>
        Change
      </button>
    </div>
  );
}
