export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-gray-900 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 animate-pulse">Loading...</p>
    </div>
  );
} 