import '@testing-library/jest-dom';
import '@/index.tsx';

test('renders the app and checks initial setup', () => {
  const rootElement = document.body.querySelector('.root');

  expect(document.body).toHaveClass('body');
  expect(rootElement).toBeInTheDocument();
});
