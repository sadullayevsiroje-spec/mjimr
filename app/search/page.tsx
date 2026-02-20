import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ''
  
  let articles: any[] = []
  if (query.length > 0) {
    articles = await prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { abstract: { contains: query, mode: 'insensitive' } },
          { keywords: { contains: query, mode: 'insensitive' } },
        ]
      },
      include: {
        issue: true,
        authors: {
          include: { author: true },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { publishedAt: 'desc' },
      take: 50
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Articles</h1>
      
      <form method="get" className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search by title, abstract, or keywords..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>

      {query && (
        <div className="mb-4">
          <p className="text-gray-600">
            Found {articles.length} result{articles.length !== 1 ? 's' : ''} for "{query}"
          </p>
        </div>
      )}

      {articles.length > 0 ? (
        <div className="space-y-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-2">
                <Link href={`/articles/${article.id}`} className="text-blue-600 hover:underline">
                  {article.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {article.authors.map(a => a.author.name).join(', ')}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                Vol. {article.issue.volume} No. {article.issue.issue} ({article.issue.year})
                {article.pages && ` • Pages ${article.pages}`}
              </p>
              <p className="text-gray-700 line-clamp-3">{article.abstract}</p>
            </div>
          ))}
        </div>
      ) : query ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-600">No articles found. Try different keywords.</p>
        </div>
      ) : null}
    </div>
  )
}
