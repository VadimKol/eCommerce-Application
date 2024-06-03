import type { ClientResponse, Customer, MyCustomerChangePassword } from '@commercetools/platform-sdk';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { tokenCache } from '@/api/build-client';
import { changePassword, login } from '@/api/client-actions.ts';

import { Tooltip } from '../tooltip/Tooltip.tsx';
import { type FormValues, registerSchema } from './register-schema.ts';
import styles from './styles.module.scss';
import type { FormChangePasswordProps } from './types.ts';

export function FormChangePassword({ email, version, setPersonInfo }: FormChangePasswordProps): JSX.Element {
  const {
    register,
    getFieldState,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: 'onChange', resolver: zodResolver(registerSchema) });

  const {
    onChange: onChangeCurrentPassword,
    name: CurrentPassword,
    ref: refCurrentPassword,
  } = register('currentPassword');
  const { onChange: onChangeNewPassword, name: NewPassword, ref: refNewPassword } = register('newPassword');

  const currentPasswordValue = getFieldState('currentPassword');
  const newPasswordValue = getFieldState('newPassword');

  let currentPasswordClass = styles.input;
  let newPasswordClass = styles.input;

  if (currentPasswordValue.isDirty) {
    currentPasswordClass += currentPasswordValue.invalid ? ` ${styles.invalid}` : ` ${styles.valid}`;
  }

  if (newPasswordValue.isDirty) {
    newPasswordClass += newPasswordValue.invalid ? ` ${styles.invalid}` : ` ${styles.valid}`;
  }

  const currentPassword = watch('currentPassword');
  const newPassword = watch('newPassword');

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
          setPersonInfo({
            version: response.body.version || 1,
            firstName: response.body.firstName || '',
            lastName: response.body.lastName || '',
            dateOfBirth: response.body.dateOfBirth || '',
            email: response.body.email || '',
            password: response.body.password || '',
            defaultShippingAddressId: response.body.defaultShippingAddressId || '',
            defaultBillingAddressId: response.body.defaultBillingAddressId || '',
            billingAddressIds: response.body.billingAddressIds || [],
            shippingAddressIds: response.body.shippingAddressIds || [],
          });
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
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        if (isValid) {
          changePasswordHandle();
        } else {
          toast('Validation error', { type: 'error' });
        }
      }}
    >
      <div className={styles.blockPassword}>
        <div className={styles.titleWithTooltip}>
          <h2>Change password</h2>
          <Tooltip
            text=" To change your password, enter your current password and the new one. Once the current password has been
        successfully verified, it will be replaced with a new password."
          />
        </div>
        <div className={styles.inputWithError}>
          <label htmlFor="password-was-login" className={styles.formInput}>
            Current password:
            <input
              onChange={(event) => {
                onChangeCurrentPassword(event).catch(() => {});
              }}
              id="current-password"
              placeholder="password"
              autoComplete="current-password"
              className={currentPasswordClass}
              ref={refCurrentPassword}
              aria-invalid={errors.currentPassword || !currentPasswordValue.isDirty ? 'true' : 'false'}
              name={CurrentPassword}
            />
          </label>
          {errors.currentPassword && (
            <span role="alert" className={styles.errorMsg}>
              {errors.currentPassword.message}
            </span>
          )}
        </div>
        <div className={styles.inputWithError}>
          <label htmlFor="password-login" className={styles.formInput}>
            New password:
            <input
              onChange={(event) => {
                onChangeNewPassword(event).catch(() => {});
              }}
              id="new-password"
              placeholder="new password"
              autoComplete="new-password"
              className={newPasswordClass}
              ref={refNewPassword}
              aria-invalid={errors.currentPassword || !newPasswordValue.isDirty ? 'true' : 'false'}
              name={NewPassword}
            />
          </label>
          {errors.newPassword && (
            <span role="alert" className={styles.errorMsg}>
              {errors.newPassword.message}
            </span>
          )}
        </div>
        <button type="submit" className={!isValid ? `${styles.changeInfo} ${styles.disabled}` : styles.changeInfo}>
          Change
        </button>
      </div>
    </form>
  );
}
