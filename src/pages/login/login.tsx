import { useForm } from 'react-hook-form';
import './login.scss';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const formSchema = z.object({
  email: z
    .string()
    .email(`Email addresses must contain both a local part and a domain name separated by an '@' symbol.`),
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
  const [revealPassword, setRevealPassword] = useState(false);
  const {
    register,
    getFieldState,
    formState: { errors, isValid },
  } = useForm<FormSchema>({ mode: 'onChange', resolver: zodResolver(formSchema) });
  const { onChange: onChangeEmail, name: Email, ref: refEmail } = register('email');
  const { onChange: onChangePassword, name: Password, ref: refPassword } = register('password');
  const emailValue = getFieldState('email');
  const passwordValue = getFieldState('password');

  let emailClass = 'email';
  let passwordClass = 'password';

  /*   const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
    // reset();
  }; */

  if (emailValue.isDirty) {
    emailClass += emailValue.invalid ? ' invalid' : ' valid';
  }

  if (passwordValue.isDirty) {
    passwordClass += passwordValue.invalid ? ' invalid' : ' valid';
  }

  return (
    <form
      className="login"
      onSubmit={(event) => {
        // handleSubmit(onSubmit)(event).catch((err) => console.log(err));
        event.preventDefault();
        // navigate('/');
      }}
    >
      <h2 className="login-title">Login</h2>
      <label htmlFor="email-login" className="email-label">
        Email:
        <input
          onChange={(event) => {
            onChangeEmail(event).catch(() => {});
          }}
          name={Email}
          ref={refEmail}
          id="email-login"
          className={emailClass}
          type="email"
          placeholder="user@example.com"
          aria-invalid={errors.email ? 'true' : 'false'}
        />
      </label>
      {errors.email && (
        <span role="alert" className="error">
          {errors.email.message}
        </span>
      )}
      <div className="password-block">
        <label htmlFor="password-login" className="password-label">
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
            aria-invalid={errors.password ? 'true' : 'false'}
          />
        </label>
        <button
          type="button"
          className={revealPassword ? 'reveal show' : 'reveal'}
          aria-label="Reveal"
          onClick={() => setRevealPassword(!revealPassword)}
        />
      </div>
      {errors.password && (
        <span role="alert" className="error">
          {errors.password.message}
        </span>
      )}
      <button type="submit" className={!isValid ? 'login-button disabled' : 'login-button'}>
        Log in
      </button>
      <p className="registry-link">
        Haven’t registered yet? Sign up {/* <Link> */}here{/* </Link> */}
      </p>
    </form>
  );
}
