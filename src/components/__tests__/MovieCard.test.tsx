import { render, screen } from '@testing-library/react';
import MovieCard from '../MovieCard';

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test Overview',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2024-03-17',
  vote_average: 8.5,
  vote_count: 100,
  genre_ids: [1, 2, 3],
};

describe('MovieCard', () => {
  it('renders movie information correctly', () => {
    render(<MovieCard movie={mockMovie} />);

    // Check if the movie title is rendered
    expect(screen.getByText('Test Movie')).toBeInTheDocument();

    // Check if the release year is rendered
    expect(screen.getByText('2024')).toBeInTheDocument();

    // Check if the rating is rendered
    expect(screen.getByText('8.5')).toBeInTheDocument();

    // Check if the movie poster is rendered with correct props
    const poster = screen.getByAltText('Test Movie');
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500/test-poster.jpg'
    );
  });

  it('uses placeholder image when poster_path is not available', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: '' };
    render(<MovieCard movie={movieWithoutPoster} />);

    const poster = screen.getByAltText('Test Movie');
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute('src', '/placeholder.jpg');
  });
}); 