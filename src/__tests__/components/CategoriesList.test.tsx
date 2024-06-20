import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { CategoriesList } from '@/components/categories-list/CategoriesList';
import { CategoriesProvider } from '@/contexts/сategories-сontext';

it('renders correctly', () => {
  const { container } = render(
    <BrowserRouter>
      <CategoriesProvider>
        <CategoriesList />
      </CategoriesProvider>
    </BrowserRouter>,
  );

  expect(container).toMatchSnapshot();
});
