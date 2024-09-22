import React, { Component, ReactNode } from 'react';
import Link from 'next/link';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.log("Error caught by ErrorBoundary:", error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-6xl font-bold text-gray-800">Something went wrong</h1>
          <p className="mt-4 text-xl text-gray-600">An unexpected error has occurred.</p>
          <Link href="/home" legacyBehavior>
            <a className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
              Go back home
            </a>
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;