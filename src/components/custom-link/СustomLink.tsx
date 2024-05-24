import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import type { LinkProps } from './types.ts';

export function CustomLink({
  children,
  variant = 'primary',
  to = '#',
  className,
  isDisabled = false,
  id = '',
}: LinkProps): JSX.Element {
  const optionClass = styles[`link--${variant}`];
  const disabledClass = styles[`link--disabled`] || '';

  if (isDisabled) {
    return <span className={classNames(className, styles.link, optionClass, disabledClass)}>{children}</span>;
  }

  return (
    <Link className={classNames(className, styles.link, optionClass)} to={to} id={id}>
      {children}
    </Link>
  );
}
