import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Header } from '@/components/header/Header';

jest.mock('./styles.module.scss', () => ({
  header: 'header',
  container: 'container',
  wordmark: 'wordmark',
}));

describe('Header Component', () => {
  test('renders correctly and matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
