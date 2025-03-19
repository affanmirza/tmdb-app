import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

// Mock the next/navigation hooks
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: () => null,
  }),
}));

describe('SearchBar', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders search input', () => {
    render(<SearchBar />);
    
    const searchInput = screen.getByPlaceholderText('Search for movies...');
    expect(searchInput).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<SearchBar />);
    
    const searchInput = screen.getByPlaceholderText('Search for movies...') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test movie' } });
    
    expect(searchInput.value).toBe('test movie');
  });

  it('navigates to search page on form submission', () => {
    render(<SearchBar />);
    
    const searchInput = screen.getByPlaceholderText('Search for movies...');
    const form = searchInput.closest('form');
    
    fireEvent.change(searchInput, { target: { value: 'test movie' } });
    fireEvent.submit(form!);
    
    expect(mockPush).toHaveBeenCalledWith('/search?query=test%20movie');
  });

  it('does not navigate if search query is empty', () => {
    render(<SearchBar />);
    
    const searchInput = screen.getByPlaceholderText('Search for movies...');
    const form = searchInput.closest('form');
    
    fireEvent.change(searchInput, { target: { value: '   ' } });
    fireEvent.submit(form!);
    
    expect(mockPush).not.toHaveBeenCalled();
  });
}); 