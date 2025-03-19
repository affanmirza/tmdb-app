import { render, screen, fireEvent } from '@testing-library/react';
import MovieGrid from '../MovieGrid';
import { Movie } from '@/types/movie';

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Test Movie 1',
    poster_path: '/test1.jpg',
    backdrop_path: '/test1-backdrop.jpg',
    vote_average: 8.5,
    vote_count: 100,
    release_date: '2024-01-01',
    overview: 'Test overview 1',
    genre_ids: [28, 12]
  },
  {
    id: 2,
    title: 'Test Movie 2',
    poster_path: '/test2.jpg',
    backdrop_path: '/test2-backdrop.jpg',
    vote_average: 7.5,
    vote_count: 80,
    release_date: '2024-01-02',
    overview: 'Test overview 2',
    genre_ids: [35, 18]
  }
];

describe('MovieGrid', () => {
  const mockLoadMore = jest.fn();

  it('renders movie cards correctly', () => {
    render(<MovieGrid movies={mockMovies} hasMore={true} loadMore={mockLoadMore} />);
    
    expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
  });

  it('shows loading state when loading more', () => {
    render(<MovieGrid movies={mockMovies} hasMore={true} loadMore={mockLoadMore} />);
    
    const loadingSpinner = document.querySelector('.animate-spin');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('shows end message when no more movies', () => {
    render(<MovieGrid movies={mockMovies} hasMore={false} loadMore={mockLoadMore} />);
    
    expect(screen.getByText('No more movies to load.')).toBeInTheDocument();
  });
}); 