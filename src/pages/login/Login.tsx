import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { deleteCart } from '@/api/cart';
import { login } from '@/api/client-actions';
import { ActionPaths } from '@/common/enums';
import { broadcastChannel } from '@/common/utils';
import { CustomButton } from '@/components/custom-button/СustomButton';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';

import { type LoginSchema, loginSchema } from './login-schema';
import styles from './styles.module.scss';

export function Login(): JSX.Element {
  const { handleLogin } = useAuth();
  const [revealPassword, setRevealPassword] = useState(false);
  const {
    register,
    getFieldState,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({ mode: 'onChange', resolver: zodResolver(loginSchema) });
  const { onChange: onChangeEmail, name: Email, ref: refEmail } = register('email');
  const { onChange: onChangePassword, name: Password, ref: refPassword } = register('password');
  const emailState = getFieldState('email');
  const passwordState = getFieldState('password');
  const email = watch('email');
  const password = watch('password');
  const { cart, updateCart } = useCart();

  let emailClass = styles.email;
  let passwordClass = styles.password;

  if (emailState.isDirty) {
    emailClass += emailState.invalid ? ` ${styles.invalid}` : ` ${styles.valid}`;
  }

  if (passwordState.isDirty) {
    passwordClass += passwordState.invalid ? ` ${styles.invalid}` : ` ${styles.valid}`;
  }

  return (
    <main className="main">
      <form
        className={styles.login}
        onSubmit={(event) => {
          event.preventDefault();
          if (isValid) {
            login({
              email,
              password,
              anonymousCart: { typeId: 'cart', id: cart?.id },
              anonymousId: cart?.anonymousId,
              anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
            })
              .then(async (response) => {
                localStorage.setItem('geek-shop-auth', 'true');
                toast(`Hello ${response.body.customer.firstName}`, { type: 'success' });
                handleLogin();
                updateCart(response.body.cart || null);
                broadcastChannel.postMessage({ type: 'Auth', payload: { cart: response.body.cart } });
                try {
                  await deleteCart(cart?.id || '');
                } catch {
                  throw new Error(`Failed to delete cart`);
                }
              })
              .catch((error: Error) => toast(error.message, { type: 'error' }));
          } else {
            toast('Validation error', { type: 'error' });
          }
        }}
      >
        <h2 className={styles.login_title}>Login</h2>
        <label htmlFor="email-login" className={styles.email_label}>
          Email:
          <input
            onChange={(event) => {
              onChangeEmail(event).catch(() => {});
            }}
            name={Email}
            ref={refEmail}
            id="email-login"
            className={emailClass}
            type="text"
            placeholder="user@example.com"
            autoComplete="email"
            aria-invalid={errors.email || !emailState.isDirty ? 'true' : 'false'}
          />
        </label>
        {errors.email && (
          <span role="alert" className={styles.error}>
            {errors.email.message}
          </span>
        )}
        <div className={styles.password_block}>
          <label htmlFor="password-login" className={styles.password_label}>
            Password:
            <input
              onChange={(event) => {
                onChangePassword(event).catch(() => {});
              }}
              name={Password}
              ref={refPassword}
              id="password-login"
              className={passwordClass}
              type={revealPassword ? 'text' : 'password'}
              placeholder="password"
              autoComplete="current-password"
              aria-invalid={errors.password || !passwordState.isDirty ? 'true' : 'false'}
            />
          </label>
          <button
            type="button"
            className={revealPassword ? `${styles.reveal} ${styles.hidden}` : styles.reveal}
            aria-label="Reveal"
            onClick={() => setRevealPassword(!revealPassword)}
          />
        </div>
        {errors.password && (
          <span role="alert" className={styles.error}>
            {errors.password.message}
          </span>
        )}
        <CustomButton type="submit" isDisabled={!isValid}>
          Log in
        </CustomButton>
        <p className={styles.registry_link}>
          Haven’t registered yet? Sign up
          <Link to={ActionPaths.REGISTER} className={styles.link}>
            {` here!`}
          </Link>
        </p>
      </form>
    </main>
  );
}
