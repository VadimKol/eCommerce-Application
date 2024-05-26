import './react-burger-menu-styles.scss';

import { useEffect, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { useLocation } from 'react-router-dom';

import { HeaderLinks } from '@/components/header/links/HeaderLinks';

export function BurgerMenu(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleStateChange = (state: { isOpen: boolean }): void => {
    setIsOpen(state.isOpen);
  };

  return (
    <Menu right disableCloseOnEsc width={280} itemListElement="div" isOpen={isOpen} onStateChange={handleStateChange}>
      <HeaderLinks isInsideBurgerMenu />
    </Menu>
  );
}
