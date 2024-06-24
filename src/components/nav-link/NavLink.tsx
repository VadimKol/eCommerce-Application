import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import styles from './styles.module.scss';

interface NavLinkProps {
  to: string;
  label: string;
  className?: string;
  setIsCurrent?: boolean;
  onClick?: React.MouseEventHandler;
  icon?: string;
  extraInfo?: string;
  insideBurgerMenu?: boolean;
}

export function NavLink({
  to,
  label,
  className,
  setIsCurrent = false,
  onClick,
  icon = '',
  extraInfo = '',
  insideBurgerMenu = false,
}: NavLinkProps): JSX.Element {
  const location = useLocation();
  const isCurrentLink = location.pathname === to;

  if (isCurrentLink && !icon) {
    return <span className={classNames(className, styles.link, styles.linkCurrent)}>{label}</span>;
  }

  if (isCurrentLink && icon) {
    return (
      <span
        className={classNames(
          className,
          styles.link,
          styles.linkCurrent,
          styles.linkIcon,
          styles[`linkIcon--${icon}`],
          { [styles.linkExtra || '']: extraInfo },
          { [styles.insideBurgerMenu || '']: insideBurgerMenu },
        )}
      >
        <span className="visually-hidden">{label}</span>
        {extraInfo && <span className={styles.extraInfo}>{extraInfo}</span>}{' '}
      </span>
    );
  }

  return (
    <Link
      className={classNames(
        className,
        styles.link,
        { [styles.linkCurrent || '']: setIsCurrent },
        { [styles.linkIcon || '']: icon },
        { [styles[`linkIcon--${icon}`] || '']: icon },
        { [styles.linkExtra || '']: extraInfo },
        { [styles.insideBurgerMenu || '']: insideBurgerMenu },
      )}
      to={to}
      onClick={onClick}
    >
      <span className={icon ? 'visually-hidden' : ''}>{label}</span>
      {extraInfo && <span className={styles.extraInfo}>{extraInfo}</span>}{' '}
    </Link>
  );
}
