import classNames from 'classnames';

import styles from './styles.module.scss';
import type { ButtonProps } from './types.ts';

export function CustomButton({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  className,
  isDisabled = false,
  id = '',
}: ButtonProps): JSX.Element {
  const optionClass = styles[`button--${variant}`];

  return (
    <button
      className={classNames(styles.button, optionClass, className)}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      id={id}
    >
      {children}
    </button>
  );
}
