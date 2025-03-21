'use client';

import { useEffect, useState } from 'react';
import { Movie } from '@/types/movie';
import { tmdbAPI } from '@/services/tmdb';
import MovieGrid from '@/components/MovieGrid';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import ErrorState from '@/components/ErrorState';
import LoadingState from '@/components/LoadingState';

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await tmdbAPI.getGeneralMovies(1);
        setMovies(response.results);
        setHasMore(page < response.total_pages);
        setError(null);
      } catch {
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const loadMore = async () => {
    try {
      const nextPage = page + 1;
      const response = await tmdbAPI.getGeneralMovies(nextPage);
      setMovies((prev) => [...prev, ...response.results]);
      setPage(nextPage);
      setHasMore(nextPage < response.total_pages);
    } catch {
      setError('Failed to load more movies. Please try again later.');
    }
  };

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div>
      <SearchBar />
      <CategoryFilter />
      {isLoading ? (
        <LoadingState />
      ) : (
        <MovieGrid movies={movies} hasMore={hasMore} loadMore={loadMore} />
      )}
    </div>
  );
}
