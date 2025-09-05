'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
          <span className="text-white font-bold text-xl">!</span>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Something went wrong!
          </h2>
          <p className="text-white text-opacity-70">
            We encountered an error while loading KnowYourRightsAI. This might be a temporary issue.
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            Try Again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-white bg-opacity-10 text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-20 transition-all duration-200"
          >
            Go Home
          </button>
        </div>
        
        {error.digest && (
          <p className="text-white text-opacity-50 text-sm">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
