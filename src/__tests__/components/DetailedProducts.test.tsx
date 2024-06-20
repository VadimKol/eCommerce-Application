import { render } from '@testing-library/react';

import DetailedProduct from '@/pages/product/detailed-product/DetailedProduct';

jest.mock('swiper/css', () => '');
jest.mock('swiper/css/navigation', () => '');
jest.mock('swiper/css/pagination', () => '');
jest.mock('swiper/modules', () => ({
  Navigation: jest.fn(),
  Pagination: jest.fn(),
}));
jest.mock('swiper/react', () => ({
  Swiper: jest.fn(),
  SwiperSlide: jest.fn(),
}));

it('renders correctly', () => {
  const product = {
    id: '',
  };
  const { container } = render(<DetailedProduct product={product} loading={false} />);

  expect(container).toMatchSnapshot();
});
