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
  alternates: {
    canonical: '/',
  },
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
    // Google Search Console verification
    // Replace with your actual verification code from Google Search Console
    google: 'your-google-verification-code-here',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
