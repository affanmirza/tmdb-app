'use client';

import { useEffect, useState } from 'react';
import { MovieDetails } from '@/types/movie';
import { tmdbAPI } from '@/services/tmdb';
import Image from 'next/image';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ErrorState from '@/components/ErrorState';
import LoadingState from '@/components/LoadingState';

export default function MovieDetailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const data = await tmdbAPI.getMovieDetails(parseInt(id));
        setMovie(data);
        setError(null);
      } catch {
        setError('The movie you\'re looking for doesn\'t exist or has been removed.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (error) {
    return <ErrorState message={error} />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (!movie) {
    return <ErrorState message="Movie not found" />;
  }

  const director = movie.credits.crew.find((person) => person.job === 'Director');
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.jpg';

  return (
    <div>
      <button
        onClick={() => window.history.back()}
        className="inline-flex items-center text-gray-900 hover:text-gray-700 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Movies
      </button>

      {backdropUrl && (
        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <div className="relative h-[450px]">
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{movie.title}</h1>
          {movie.tagline && (
            <p className="text-xl text-gray-600 italic mb-4">{movie.tagline}</p>
          )}

          <div className="flex items-center gap-4 mb-6">
            <span className="bg-gray-900 text-white px-3 py-1 rounded">
              {new Date(movie.release_date).getFullYear()}
            </span>
            <span className="bg-gray-900 text-white px-3 py-1 rounded">
              {movie.runtime} min
            </span>
            <span className="flex items-center text-gray-700">
              <span className="text-yellow-400 mr-1">★</span>
              {movie.vote_average.toFixed(1)}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
          </div>

          {director && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">Director</h2>
              <p className="text-gray-700">{director.name}</p>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-900 text-white px-3 py-1 rounded text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {movie.credits.cast.slice(0, 8).map((person) => (
                <div key={person.id} className="text-center">
                  <div className="relative w-full aspect-[2/3] mb-2">
                    <Image
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                          : '/placeholder.jpg'
                      }
                      alt={person.name}
                      fill
                      className="object-cover rounded"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <p className="font-medium truncate text-gray-900">{person.name}</p>
                  <p className="text-sm text-gray-600 truncate">
                    {person.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 