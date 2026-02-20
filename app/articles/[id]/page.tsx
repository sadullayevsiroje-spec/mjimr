import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function ArticlePage({
  params,
}: {
  params: { id: string }
}) {
  const article = await prisma.article.findUnique({
    where: { id: params.id },
    include: {
      issue: true,
      authors: {
        include: { author: true },
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!article) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <Link href="/search" className="text-blue-600 hover:underline text-sm">
            ← Back to search
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        
        <div className="mb-6 pb-6 border-b">
          <div className="text-gray-700 mb-2">
            {article.authors.map((a, i) => (
              <span key={a.id}>
                {a.author.name}
                {a.author.affiliation && <sup className="text-xs">{i + 1}</sup>}
                {i < article.authors.length - 1 && ', '}
              </span>
            ))}
          </div>
          
          {article.authors.some(a => a.author.affiliation) && (
            <div className="text-sm text-gray-600 mt-3">
              {article.authors.map((a, i) => 
                a.author.affiliation && (
                  <div key={a.id}>
                    <sup>{i + 1}</sup> {a.author.affiliation}
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <div className="mb-6 text-sm text-gray-600">
          <p>Vol. {article.issue.volume} No. {article.issue.issue} ({article.issue.year})</p>
          {article.pages && <p>Pages: {article.pages}</p>}
          {article.doi && <p>DOI: {article.doi}</p>}
          <p>Published: {new Date(article.publishedAt).toLocaleDateString()}</p>
        </div>

        {article.keywords && (
          <div className="mb-6">
            <h3 className="font-bold mb-2">Keywords:</h3>
            <p className="text-gray-700">{article.keywords}</p>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">Abstract</h2>
          <p className="text-gray-700 leading-relaxed">{article.abstract}</p>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-xl font-bold mb-3">Full Text</h2>
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>
        </div>
      </article>
    </div>
  )
}
