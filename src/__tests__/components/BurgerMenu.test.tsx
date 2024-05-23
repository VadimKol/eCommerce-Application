import { render } from '@testing-library/react';
import { slide as Menu } from 'react-burger-menu';

import { BurgerMenu } from '@/components/header/burger-menu/BurgerMenu';
import { HeaderLinks } from '@/components/header/links/HeaderLinks';

jest.mock('@/components/header/links/HeaderLinks', () => ({
  HeaderLinks: jest.fn(() => <div>Mock HeaderLinks</div>), // Mocking HeaderLinks component
}));

jest.mock('react-burger-menu', () => ({
  slide: jest.fn(({ children }) => <div>Mock Menu {children}</div>), // Mocking Menu component
}));

describe('BurgerMenu Component', () => {
  it('renders BurgerMenu component correctly with HeaderLinks inside Menu', () => {
    render(<BurgerMenu />);

    expect(Menu).toHaveBeenCalledWith(
      expect.objectContaining({
        right: true,
        disableCloseOnEsc: true,
        width: 280,
        itemListElement: 'div',
      }),
      {},
    );

    expect(HeaderLinks).toHaveBeenCalledWith(
      expect.objectContaining({
        isInsideBurgerMenu: true,
      }),
      {},
    );
  });
});
