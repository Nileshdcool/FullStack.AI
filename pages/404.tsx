import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Oops! Page not found.</p>
      <Link legacyBehavior href="/">
        <a className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          Go back home
        </a>
      </Link>
    </div>
  );
}