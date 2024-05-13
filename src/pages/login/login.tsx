import { useForm } from 'react-hook-form';
// import type { SubmitHandler } from 'react-hook-form';
import './login.scss';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().email('Incorrect email'),
  password: z
    .string()
    .min(8, 'Minimum 8 characters')
    .refine((val) => /[A-Z]/.test(val), 'Password must contain at least one uppercase letter')
    .refine((val) => /[a-z]/.test(val), 'Password must contain at least one lowercase letter')
    .refine((val) => /[0-9]/.test(val), 'Password must contain at least one digit')
    .refine(
      (val) => val[0] !== ' ' && val[val.length - 1] !== ' ',
      'Password must not contain leading or trailing whitespace.',
    ),
});
// .required(); // толку нет от обязательности, isValid не даст зайти все равно

type FormSchema = z.infer<typeof formSchema>;

export function Login(): JSX.Element {
  const {
    register,
    // handleSubmit,
    // reset,
    formState: { errors, isValid },
  } = useForm<FormSchema>({ mode: 'onChange', resolver: zodResolver(formSchema) });
  const { onChange: onChangeEmail, name: Email, ref: refEmail } = register('email');
  const { onChange: onChangePassword, name: Password, ref: refPassword } = register('password');

  /*   const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
    // reset();
  }; */

  return (
    <form
      className="login"
      onSubmit={(event) => {
        // handleSubmit(onSubmit)(event).catch((err) => console.log(err));
        event.preventDefault(); // это можно не писать, если валидировать на сабмите
      }}
    >
      <input
        onChange={(event) => {
          onChangeEmail(event).catch(() => {});
        }}
        name={Email}
        ref={refEmail}
        className="email"
        type="email" // не будет ошибки с пробелами в начале и в конце, так как удаляются, нужен тип text
        placeholder="name@mail.com"
        aria-invalid={errors.email ? 'true' : 'false'}
      />
      {errors.email && (
        <span role="alert" className="error">
          {errors.email.message}
        </span>
      )}
      <input
        onChange={(event) => {
          onChangePassword(event).catch(() => {});
        }}
        name={Password}
        ref={refPassword}
        className="password"
        type="password"
        placeholder="password"
        aria-invalid={errors.password ? 'true' : 'false'}
      />
      {errors.password && (
        <span role="alert" className="error">
          {errors.password.message}
        </span>
      )}
      <button type="submit" className="login-button" disabled={!isValid}>
        Login
      </button>
    </form>
  );
}
