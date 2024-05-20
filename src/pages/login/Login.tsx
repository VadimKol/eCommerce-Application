import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { tokenCache } from '@/api/build-client';
import { login } from '@/api/client-actions';
import { ActionPaths } from '@/common/enums';
import { CustomButton } from '@/components/custom-button/customButton';
import { useAuth } from '@/hooks/useAuth';

import styles from './styles.module.scss';

const formSchema = z.object({
  email: z
    .string()
    .email('Email addresses must be properly formatted (e.g., user@example.com).')
    .refine((value) => value.trim() === value, {
      message: 'Email addresses must not contain leading or trailing whitespace.',
    })
    .refine(
      (value) => {
        const parts = value.split('@');
        return parts.length === 2 && parts[1]?.includes('.');
      },
      {
        message: 'Email addresses must contain a domain name (e.g., example.com).',
      },
    )
    .refine((value) => value.includes('@'), {
      message: 'Email addresses must contain an "@" symbol separating local part and domain name.',
    }),
  password: z
    .string()
    .min(8, 'Minimum 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one digit')
    .refine(
      (val) => val[0] !== ' ' && val[val.length - 1] !== ' ',
      'Password must not contain leading or trailing whitespace.',
    ),
});

type FormSchema = z.infer<typeof formSchema>;

export function Login(): JSX.Element {
  const { handleLogin } = useAuth();
  const [revealPassword, setRevealPassword] = useState(false);
  const {
    register,
    getFieldState,
    getValues,
    formState: { errors, isValid },
  } = useForm<FormSchema>({ mode: 'onChange', resolver: zodResolver(formSchema) });
  const { onChange: onChangeEmail, name: Email, ref: refEmail } = register('email');
  const { onChange: onChangePassword, name: Password, ref: refPassword } = register('password');
  const emailState = getFieldState('email');
  const passwordState = getFieldState('password');
  const email = getValues('email');
  const password = getValues('password');

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
          login({ email, password })
            .then((response) => {
              localStorage.setItem('geek-shop-token', `${tokenCache.get().token}`);

              // не даст выполнить запросы для анонима
              // apiRoot.me().get().execute().then(console.log).catch(console.error);
              // apiRoot.me().get().execute().then(console.log).catch(console.error);

              toast(`Hello ${response.body.customer.firstName}`, { type: 'success' });
              handleLogin();
            })
            .catch((error: Error) => toast(error.message, { type: 'error' }));
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
