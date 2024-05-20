import './react-burger-menu-styles.scss';

import { slide as Menu } from 'react-burger-menu';

import { HeaderLinks } from '../links/HeaderLinks';

export function BurgerMenu(): JSX.Element {
  return (
    <Menu right disableCloseOnEsc width={280} itemListElement="div">
      <HeaderLinks isInsideBurgerMenu />
    </Menu>
  );
}
