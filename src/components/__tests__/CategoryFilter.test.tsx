import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryFilter from '../CategoryFilter';
import { usePathname } from 'next/navigation';

// Mock the usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('CategoryFilter', () => {
  it('renders all category buttons', () => {
    render(<CategoryFilter />);
    // Check if all category buttons are rendered
    expect(screen.getByText('Now Playing')).toBeDefined();
    expect(screen.getByText('Popular')).toBeDefined();
    expect(screen.getByText('Top Rated')).toBeDefined();
    expect(screen.getByText('Upcoming')).toBeDefined();
  });

  it('applies active styles to current category', () => {
    // Mock usePathname to return '/popular'
    (usePathname as jest.Mock).mockReturnValue('/popular');
    
    render(<CategoryFilter />);
    const popularButton = screen.getByText('Popular').closest('a');
    expect(popularButton).toHaveClass('category-button', 'category-button-active');
    
    const upcomingButton = screen.getByText('Upcoming').closest('a');
    expect(upcomingButton).toHaveClass('category-button', 'text-gray-900', 'hover:text-gray-700');
  });

  it('renders correct links for each category', () => {
    render(<CategoryFilter />);
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);


    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/now-playing');
    expect(links[2]).toHaveAttribute('href', '/popular');
    expect(links[3]).toHaveAttribute('href', '/top-rated');
    expect(links[4]).toHaveAttribute('href', '/upcoming');
  });
}); 