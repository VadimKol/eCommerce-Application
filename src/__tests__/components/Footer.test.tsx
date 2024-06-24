import { render } from '@testing-library/react';

import { Footer } from '@/components/footer/Footer';

describe('Footer component', () => {
  it('renders correctly', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
