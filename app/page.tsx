import Link from 'next/link'
import { journal } from '@/data/journal'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: journal.name,
  description: journal.description,
  alternates: {
    canonical: 'https://mjimr.vercel.app/',
  },
  openGraph: {
    url: 'https://mjimr.vercel.app/',
  },
}

export default async function Home() {
  // Get current issue with articles
  const currentIssue = await prisma.issue.findFirst({
    orderBy: [
      { year: 'desc' },
      { volume: 'desc' },
      { issue: 'desc' }
    ],
    include: {
      articles: {
        include: {
          authors: {
            include: { author: true },
            orderBy: { order: 'asc' }
          }
        },
        orderBy: { publishedAt: 'desc' }
      }
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12 py-12 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl shadow-lg">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
          {journal.name}
        </h1>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto">{journal.description}</p>
        <div className="mt-6 flex items-center justify-center space-x-4 text-sm">
          <span className="bg-secondary-100 text-secondary-700 px-4 py-2 rounded-full font-semibold">
            {journal.frequency}
          </span>
          <span className="bg-accent-100 text-accent-700 px-4 py-2 rounded-full font-semibold">
            Open Access
          </span>
          <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full font-semibold">
            Peer Reviewed
          </span>
        </div>
      </div>

      {/* Current Issue */}
      {currentIssue && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Current Issue</h2>
            <span className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              Open Access
            </span>
          </div>
          
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-8 mb-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-semibold mb-2">
              Vol. {currentIssue.volume} No. {currentIssue.issue} ({currentIssue.year})
            </h3>
            <p className="text-primary-100">
              Published: {new Date(currentIssue.published).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Articles List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Articles</h3>
            {currentIssue.articles.length === 0 ? (
              <p className="text-gray-600 bg-white p-8 rounded-xl text-center">No articles in this issue yet.</p>
            ) : (
              currentIssue.articles.map((article) => (
                <article key={article.id} className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-2xl hover:border-primary-200 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <span className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Open Access
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="text-2xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                    <Link href={`/articles/${article.id}`}>
                      {article.title}
                    </Link>
                  </h4>

                  <div className="mb-3">
                    {article.authors.map((authorRel, idx) => (
                      <div key={authorRel.id} className="text-gray-700">
                        <span className="font-medium">{authorRel.author.name}</span>
                        {authorRel.author.affiliation && (
                          <span className="text-sm text-gray-600">
                            , {authorRel.author.affiliation}
                          </span>
                        )}
                        {idx < article.authors.length - 1 && <br />}
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-gray-600 mb-3 bg-gray-50 p-3 rounded-lg">
                    <span className="font-semibold text-primary-600">{journal.name}</span>
                    <br />
                    Vol. {currentIssue.volume} No. {currentIssue.issue} ({currentIssue.year})
                    {article.pages && `: ${article.pages}`}
                  </div>

                  <p className="text-gray-700 line-clamp-3 mb-4">{article.abstract}</p>

                  <Link 
                    href={`/articles/${article.id}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group"
                  >
                    Read more 
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </article>
              ))
            )}
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="grid md:grid-cols-2 gap-6 mt-12">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-primary-500 p-3 rounded-lg mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">About the Journal</h3>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">
            {journal.name} is a peer-reviewed open access journal dedicated to publishing 
            high-quality research in medical and health sciences.
          </p>
          <Link href="/about" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group">
            Read more 
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-secondary-500 p-3 rounded-lg mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">For Authors</h3>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Submit your research to reach a global audience. We welcome original research 
            articles, reviews, and case studies.
          </p>
          <Link href="/author-guidelines" className="inline-flex items-center text-secondary-600 hover:text-secondary-700 font-medium group">
            Submission Guidelines 
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
