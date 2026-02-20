import Link from 'next/link'
import { journal } from '@/data/journal'
import { prisma } from '@/lib/prisma'

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
      <div className="text-center mb-12 py-8 border-b">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{journal.name}</h1>
        <p className="text-gray-600">{journal.description}</p>
        <div className="mt-4 text-sm text-gray-500">
          ISSN: {journal.issn} | {journal.frequency} | Open Access
        </div>
      </div>

      {/* Current Issue */}
      {currentIssue && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Current Issue</h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              Open Access
            </span>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
            <h3 className="text-xl font-semibold mb-2">
              Vol. {currentIssue.volume} No. {currentIssue.issue} ({currentIssue.year})
            </h3>
            <p className="text-gray-600">
              Published: {new Date(currentIssue.published).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Articles List */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Articles</h3>
            {currentIssue.articles.length === 0 ? (
              <p className="text-gray-600">No articles in this issue yet.</p>
            ) : (
              currentIssue.articles.map((article) => (
                <article key={article.id} className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                      Open Access
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    <Link href={`/articles/${article.id}`} className="hover:text-blue-600">
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

                  <div className="text-sm text-gray-600 mb-3">
                    <span className="font-semibold">{journal.name}</span>
                    <br />
                    Vol. {currentIssue.volume} No. {currentIssue.issue} ({currentIssue.year})
                    {article.pages && `: ${article.pages}`}
                  </div>

                  <p className="text-gray-700 line-clamp-3 mb-4">{article.abstract}</p>

                  <Link 
                    href={`/articles/${article.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Read more →
                  </Link>
                </article>
              ))
            )}
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="grid md:grid-cols-2 gap-8 mt-12">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4 text-gray-800">About the Journal</h3>
          <p className="text-gray-600 mb-4">
            {journal.name} is a peer-reviewed open access journal dedicated to publishing 
            high-quality research in medical and health sciences.
          </p>
          <Link href="/about" className="text-blue-600 hover:underline">
            Read more →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4 text-gray-800">For Authors</h3>
          <p className="text-gray-600 mb-4">
            Submit your research to reach a global audience. We welcome original research 
            articles, reviews, and case studies.
          </p>
          <Link href="/author-guidelines" className="text-blue-600 hover:underline">
            Submission Guidelines →
          </Link>
        </div>
      </section>
    </div>
  )
}
