import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { CategoriesProvider } from '@/contexts/сategories-сontext';
import { Product } from '@/pages/product/Product';

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

it('renders correctly', async () => {
  const { container } = render(
    <BrowserRouter>
      <CategoriesProvider>
        <Product />
      </CategoriesProvider>
    </BrowserRouter>,
  );
  await waitFor(() => {
    expect(container).toMatchSnapshot();
  });
});
