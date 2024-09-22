import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';

interface ErrorPageProps {
  statusCode: number;
}

export default function ErrorPage({ statusCode }: ErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    console.error(`Error ${statusCode} on ${router.asPath}`);
  }, [statusCode, router.asPath]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">{statusCode}</h1>
      <p className="mt-4 text-xl text-gray-600">
        {statusCode === 404
          ? 'Page not found.'
          : 'An unexpected error has occurred.'}
      </p>
      <Link legacyBehavior href="/">
        <a className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          Go back home
        </a>
      </Link>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};