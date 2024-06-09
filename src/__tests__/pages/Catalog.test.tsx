import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { CategoriesProvider } from '@/contexts/сategories-сontext';
import { Catalog } from '@/pages/catalog/Catalog';

it('renders correctly', () => {
  const { container } = render(
    <BrowserRouter>
      <CategoriesProvider>
        <Catalog />
      </CategoriesProvider>
    </BrowserRouter>,
  );
  expect(container).toMatchSnapshot();
});
