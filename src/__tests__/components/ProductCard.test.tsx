import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { type Product } from '@/common/types';
import { ProductCard } from '@/components/product-card/ProductCard';

it('renders correctly', () => {
  const product: Product = {
    id: '',
    name: '',
    description: '',
    slug: '',
    key: '',
    sku: '',
    quantity: 0,
    price: '00.00',
    discount: '00.00',
    images: [''],
    categories: [],
    keyCategory: '',
    keySubCategory: '',
  };

  const { container } = render(
    <BrowserRouter>
      <ProductCard product={product} categoryName="Cosplay" subcategoryName="Mask" />
    </BrowserRouter>,
  );

  expect(container).toMatchSnapshot();
});
