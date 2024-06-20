import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs';
import { CategoriesProvider } from '@/contexts/сategories-сontext';

it('renders correctly', () => {
  const { container } = render(
    <BrowserRouter>
      <CategoriesProvider>
        <Breadcrumbs />
      </CategoriesProvider>
    </BrowserRouter>,
  );

  expect(container).toMatchSnapshot();
});
