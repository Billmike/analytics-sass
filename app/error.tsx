'use client';

import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <AlertTriangle className="h-20 w-20 text-red-500 mx-auto" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Oops!</h1>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Something went wrong
          </h2>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          An unexpected error occurred. Our team has been notified and is working to fix the issue.
        </p>

        {error.digest && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex justify-center gap-4">
          <Button 
            variant="default"
            onClick={reset}
          >
            Try Again
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/'}
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Technical Details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 text-left max-w-2xl mx-auto">
            <details className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                Technical Details
              </summary>
              <pre className="mt-2 text-xs text-gray-600 dark:text-gray-400 overflow-auto">
                {error.stack}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}