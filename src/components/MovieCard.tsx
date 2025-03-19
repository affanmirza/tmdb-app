import { Movie } from '@/types/movie';
import Image from 'next/image';
import Link from 'next/link';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.jpg';

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="movie-card group">
        <div className="relative h-[400px] overflow-hidden">
          <Image
            src={imageUrl}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="movie-card-content">
          <h3 className="movie-card-title">{movie.title}</h3>
          <div className="movie-card-meta">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <div className="rating">
              <span>★</span>
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 