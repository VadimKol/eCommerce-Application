import { render } from '@testing-library/react';

import { CatalogGrid } from '@/components/catalog-grid/CatalogGrid';

it('renders correctly', () => {
  const { container } = render(<CatalogGrid />);
  expect(container).toMatchSnapshot();
});
