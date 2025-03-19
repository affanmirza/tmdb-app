import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface ErrorStateProps {
  message: string;
  showBackButton?: boolean;
}

export default function ErrorState({ message, showBackButton = true }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-48 h-48 mb-8 relative">
        <Image
          src="/error.svg"
          alt="Error illustration"
          fill
          className="object-contain"
          priority
        />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Oops! Something went wrong</h2>
      <p className="text-gray-600 mb-8 max-w-md">{message}</p>
      {showBackButton && (
        <Link
          href="/"
          className="inline-flex items-center text-gray-900 hover:text-gray-700 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      )}
    </div>
  );
} 