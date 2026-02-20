import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { journal } from '@/data/journal'

export default async function IssuePage({ 
  params 
}: { 
  params: { year: string; volume: string; issue: string } 
}) {
  const issueData = await prisma.issue.findFirst({
    where: {
      year: parseInt(params.year),
      volume: parseInt(params.volume),
      issue: parseInt(params.issue)
    },
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

  if (!issueData) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <Link href="/archive" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Archives
        </Link>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Vol. {issueData.volume} No. {issueData.issue} ({issueData.year})
              </h1>
              <p className="text-gray-600">
                Published: {new Date(issueData.published).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              Open Access
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Articles</h2>
        <p className="text-gray-600">{issueData.articles.length} article{issueData.articles.length !== 1 ? 's' : ''} in this issue</p>
      </div>

      <div className="space-y-6">
        {issueData.articles.length > 0 ? (
          issueData.articles.map((article) => (
            <article key={article.id} className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                  Open Access
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                <Link href={`/articles/${article.id}`} className="hover:text-blue-600">
                  {article.title}
                </Link>
              </h3>

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
                Vol. {issueData.volume} No. {issueData.issue} ({issueData.year})
                {article.pages && `: ${article.pages}`}
                {article.doi && (
                  <>
                    <br />
                    DOI: {article.doi}
                  </>
                )}
              </div>

              <p className="text-gray-700 line-clamp-3 mb-4">{article.abstract}</p>

              <Link 
                href={`/articles/${article.id}`}
                className="text-blue-600 hover:underline font-medium"
              >
                Read full article →
              </Link>
            </article>
          ))
        ) : (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <p className="text-gray-600">No articles published in this issue yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
