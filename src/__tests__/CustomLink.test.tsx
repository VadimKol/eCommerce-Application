import '@testing-library/jest-dom';

import type { RenderResult } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import type { LinkProps } from '@/components/custom-link/types';
import { CustomLink } from '@/components/custom-link/СustomLink';

// Mock styles to prevent CSS class issues in tests
jest.mock('./styles.module.scss', () => ({
  link: 'link',
  'link--primary': 'link--primary',
  'link--secondary': 'link--secondary',
  'link--tertiary': 'link--tertiary',
  'link--cancel': 'link--cancel',
  'link--disabled': 'link--disabled',
}));

describe('CustomLink Component', () => {
  const renderComponent = (props: Partial<LinkProps> = {}): RenderResult => {
    const {
      children = 'Test Link',
      variant = 'primary',
      to = '#',
      className = '',
      isDisabled = false,
      id = '',
    } = props;

    return render(
      <BrowserRouter>
        <CustomLink variant={variant} to={to} className={className} isDisabled={isDisabled} id={id}>
          {children}
        </CustomLink>
      </BrowserRouter>,
    );
  };

  test('renders primary link by default', () => {
    renderComponent();

    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass('link', 'link--primary');
    expect(linkElement.tagName).toBe('A');
  });

  test('renders with provided variant', () => {
    renderComponent({ variant: 'secondary' } as LinkProps);

    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass('link', 'link--secondary');
  });

  test('renders with additional className', () => {
    renderComponent({ className: 'additional-class' } as LinkProps);

    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toHaveClass('additional-class');
  });

  test('renders with provided id', () => {
    renderComponent({ id: 'custom-id' } as LinkProps);

    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toHaveAttribute('id', 'custom-id');
  });

  test('renders as span when disabled', () => {
    renderComponent({ isDisabled: true } as LinkProps);

    const linkElement = screen.getByText('Test Link');
    expect(linkElement.tagName).toBe('SPAN');
    expect(linkElement).toHaveClass('link', 'link--primary', 'link--disabled');
  });

  test('renders with provided "to" attribute', () => {
    renderComponent({ to: '/test-path' } as LinkProps);

    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toHaveAttribute('href', '/test-path');
  });
});
