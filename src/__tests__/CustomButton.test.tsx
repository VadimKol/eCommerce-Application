import '@testing-library/jest-dom';

import type { RenderResult } from '@testing-library/react';
import { fireEvent, render, screen } from '@testing-library/react';

import type { ButtonProps } from '@/components/custom-button/types';
import { CustomButton } from '@/components/custom-button/СustomButton';

// Mock styles to prevent CSS class issues in tests
jest.mock('./styles.module.scss', () => ({
  button: 'button',
  'button--primary': 'button--primary',
  'button--secondary': 'button--secondary',
  'button--tertiary': 'button--tertiary',
  'button--cancel': 'button--cancel',
}));

describe('CustomButton Component', () => {
  const renderComponent = (props: Partial<ButtonProps> = {}): RenderResult => {
    const {
      children = 'Test Button',
      type = 'button',
      variant = 'primary',
      onClick,
      className = '',
      isDisabled = false,
      id = '',
    } = props;

    return render(
      <CustomButton
        type={type}
        variant={variant}
        onClick={onClick}
        className={className}
        isDisabled={isDisabled}
        id={id}
      >
        {children}
      </CustomButton>,
    );
  };

  test('renders with default props', () => {
    renderComponent();

    const buttonElement = screen.getByText('Test Button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button', 'button--primary');
    expect(buttonElement).toHaveAttribute('type', 'button');
    expect(buttonElement).not.toBeDisabled();
  });

  test('renders with provided variant', () => {
    renderComponent({ variant: 'secondary' });

    const buttonElement = screen.getByText('Test Button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button', 'button--secondary');
  });

  test('renders with additional className', () => {
    renderComponent({ className: 'additional-class' });

    const buttonElement = screen.getByText('Test Button');
    expect(buttonElement).toHaveClass('additional-class');
  });

  test('renders with provided id', () => {
    renderComponent({ id: 'custom-id' });

    const buttonElement = screen.getByText('Test Button');
    expect(buttonElement).toHaveAttribute('id', 'custom-id');
  });

  test('renders with provided type', () => {
    renderComponent({ type: 'submit' });

    const buttonElement = screen.getByText('Test Button');
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  test('renders as disabled when isDisabled is true', () => {
    renderComponent({ isDisabled: true });

    const buttonElement = screen.getByText('Test Button');
    expect(buttonElement).toBeDisabled();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    renderComponent({ onClick: handleClick });

    const buttonElement = screen.getByText('Test Button');
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
