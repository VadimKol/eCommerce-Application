import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import styles from './styles.module.scss';

interface NavLinkProps {
  to: string;
  label: string;
  className?: string;
  setIsCurrent?: boolean;
  onClick?: React.MouseEventHandler;
}

export function NavLink({ to, label, className, setIsCurrent = false, onClick }: NavLinkProps): JSX.Element {
  const location = useLocation();
  const isCurrentLink = location.pathname === to;

  if (isCurrentLink) {
    return <span className={classNames(className, styles.link, styles.linkCurrent)}>{label}</span>;
  }

  return (
    <Link
      className={classNames(className, styles.link, { [styles.linkCurrent!]: setIsCurrent })}
      to={to}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}