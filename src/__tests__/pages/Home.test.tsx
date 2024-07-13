import { render } from '@testing-library/react';

import { Home } from '@/pages/home/Home';

jest.mock('swiper/css', () => '');
jest.mock('swiper/css/navigation', () => '');
jest.mock('swiper/css/pagination', () => '');
jest.mock('swiper/modules', () => ({
  Navigation: jest.fn(),
  Pagination: jest.fn(),
  Autoplay: jest.fn(),
}));
jest.mock('swiper/react', () => ({
  Swiper: jest.fn(),
  SwiperSlide: jest.fn(),
}));

it('renders correctly', () => {
  const { container } = render(<Home />);

  expect(container).toMatchSnapshot();
});
