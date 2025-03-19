import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';

interface MovieGridProps {
  movies: Movie[];
  hasMore: boolean;
  loadMore: () => void;
}

export default function MovieGrid({ movies, hasMore, loadMore }: MovieGridProps) {
  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={loadMore}
      hasMore={hasMore}
      loader={
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      }
      endMessage={
        <p className="text-center text-gray-400 p-4">
          No more movies to load.
        </p>
      }
    >
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </InfiniteScroll>
  );
} 