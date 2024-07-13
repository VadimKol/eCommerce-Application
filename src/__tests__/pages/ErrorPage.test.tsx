import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { ErrorPage } from '@/pages/error/ErrorPage';

// Mocking the necessary hooks
jest.mock('react-router-dom', () => ({
  useRouteError: jest.fn(),
  isRouteErrorResponse: jest.fn(),
}));

describe('ErrorPage Component', () => {
  const mockUseRouteError = useRouteError as jest.Mock;
  const mockIsRouteErrorResponse = isRouteErrorResponse as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders generic error message', () => {
    mockUseRouteError.mockReturnValue(null);

    render(<ErrorPage />);

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Sorry, an unexpected error has occurred.')).toBeInTheDocument();
    expect(screen.getByText('Please try to refresh the page.')).toBeInTheDocument();
    expect(screen.queryByText('Error message:')).not.toBeInTheDocument();
  });

  test('renders route error response message', () => {
    const error = { statusText: 'Not Found' };
    mockUseRouteError.mockReturnValue(error);
    mockIsRouteErrorResponse.mockReturnValue(true);

    render(<ErrorPage />);

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Sorry, an unexpected error has occurred.')).toBeInTheDocument();
    expect(screen.getByText('Error message:')).toBeInTheDocument();
    expect(screen.getByText('Not Found')).toBeInTheDocument();
    expect(screen.getByText('Please try to refresh the page.')).toBeInTheDocument();
  });

  test('renders generic error message for non-route error', () => {
    const error = new Error('Something went wrong');
    mockUseRouteError.mockReturnValue(error);
    mockIsRouteErrorResponse.mockReturnValue(false);

    render(<ErrorPage />);

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Sorry, an unexpected error has occurred.')).toBeInTheDocument();
    expect(screen.getByText('Error message:')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Please try to refresh the page.')).toBeInTheDocument();
  });

  test('handles unknown error types gracefully', () => {
    const error = { unknown: 'Unknown error type' };
    mockUseRouteError.mockReturnValue(error);
    mockIsRouteErrorResponse.mockReturnValue(false);

    render(<ErrorPage />);

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Sorry, an unexpected error has occurred.')).toBeInTheDocument();
    expect(screen.queryByText('Error message:')).not.toBeInTheDocument();
    expect(screen.queryByText('Unknown error type')).not.toBeInTheDocument();
    expect(screen.getByText('Please try to refresh the page.')).toBeInTheDocument();
  });
});
