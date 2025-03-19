'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Movie } from '@/types/movie';
import { tmdbAPI } from '@/services/tmdb';
import MovieGrid from '@/components/MovieGrid';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import ErrorState from '@/components/ErrorState';
import LoadingState from '@/components/LoadingState';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      
      try {
        setIsLoading(true);
        const response = await tmdbAPI.searchMovies(query, 1);
        setMovies(response.results);
        setHasMore(page < response.total_pages);
        setError(null);
      } catch {
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    setPage(1);
    fetchMovies();
  }, [query]);

  const loadMore = async () => {
    if (!query) return;
    
    try {
      const nextPage = page + 1;
      const response = await tmdbAPI.searchMovies(query, nextPage);
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
      {query && (
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
          Search Results for &quot;{query}&quot;
        </h2>
      )}
      {isLoading ? (
        <LoadingState />
      ) : movies.length > 0 ? (
        <MovieGrid movies={movies} hasMore={hasMore} loadMore={loadMore} />
      ) : (
        <ErrorState 
          message={`No movies found for "${query}"`} 
          showBackButton={false}
        />
      )}
    </div>
  );
} 