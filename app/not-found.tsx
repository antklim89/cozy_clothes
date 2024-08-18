import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-5xl font-bold text-center text-gray-700">404 | Page Not Found</h1>
      <p className="mt-4 text-xl text-gray-500">The page you're looking for doesn't exist.</p>
      <Link
        href="/"
        className="inline-flex items-center px-4 py-2 text-sm font-medium underline text-blue-600 hover:text-blue-900"
      >
        Go back to home
      </Link>
    </div>
  );
};

export default NotFound;
