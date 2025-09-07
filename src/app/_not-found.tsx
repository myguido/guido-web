import Link from 'next/link';
import { headers } from 'next/headers';

export default async function NotFound() {
  const heads = headers();
  const path = heads.get('x-invoke-path') || 'Page';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-center">
        {path} Not Found
      </h2>
      <p className="text-gray-400 mb-8 text-center max-w-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/"
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 ease-in-out shadow-lg transform hover:scale-105"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
