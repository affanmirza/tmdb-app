import { render, screen } from '@testing-library/react';
import ErrorState from '../ErrorState';

describe('ErrorState', () => {
  const errorMessage = 'Something went wrong!';

  it('renders error message correctly', () => {
    render(<ErrorState message={errorMessage} />);
    
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('shows back button by default', () => {
    render(<ErrorState message={errorMessage} />);
    
    const backButton = screen.getByText('Back to Home');
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest('a')).toHaveAttribute('href', '/');
  });

  it('hides back button when showBackButton is false', () => {
    render(<ErrorState message={errorMessage} showBackButton={false} />);
    
    expect(screen.queryByText('Back to Home')).not.toBeInTheDocument();
  });

  it('renders error illustration', () => {
    render(<ErrorState message={errorMessage} />);
    
    const illustration = screen.getByAltText('Error illustration');
    expect(illustration).toBeInTheDocument();
  });
}); 