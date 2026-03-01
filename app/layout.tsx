import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { journal } from '@/data/journal'

export const metadata: Metadata = {
  title: {
    default: journal.name,
    template: `%s | ${journal.shortName}`
  },
  description: journal.description,
  keywords: journal.keywords,
  authors: [{ name: journal.publisher }],
  creator: journal.publisher,
  publisher: journal.publisher,
  metadataBase: new URL('https://mjimr.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mjimr.vercel.app',
    title: journal.name,
    description: journal.description,
    siteName: journal.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: journal.name,
    description: journal.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google19a0f3b907159c83', // From public/google19a0f3b907159c83.html
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyJournal',
    name: journal.name,
    alternateName: journal.shortName,
    issn: journal.issn,
    publisher: {
      '@type': 'Organization',
      name: journal.publisher,
    },
    description: journal.description,
    url: 'https://mjimr.vercel.app',
    inLanguage: 'en',
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${journal.name} RSS Feed`}
          href="/feed.xml"
        />
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
