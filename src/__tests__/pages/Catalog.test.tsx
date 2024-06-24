import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { CategoriesProvider } from '@/contexts/сategories-сontext';
import { Catalog } from '@/pages/catalog/Catalog';

it('renders correctly', async () => {
  const { container } = render(
    <BrowserRouter>
      <CategoriesProvider>
        <Catalog />
      </CategoriesProvider>
    </BrowserRouter>,
  );
  await waitFor(() => {
    expect(container).toMatchSnapshot();
  });
});
