import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <FileQuestion className="h-20 w-20 text-gray-400 dark:text-gray-500 mx-auto" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404</h1>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Page Not Found</h2>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>

        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/">Back to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/support">Get Help</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}