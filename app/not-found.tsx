import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found.',
}

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <div className="space-x-4">
        <Link 
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Homepage
        </Link>
        <Link 
          href="/search"
          className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Search Articles
        </Link>
      </div>
    </div>
  )
}
