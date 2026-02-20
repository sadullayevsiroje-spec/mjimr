import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    include: {
      issue: true,
      authors: {
        include: {
          author: true
        },
        orderBy: {
          order: 'asc'
        }
      }
    },
    orderBy: {
      publishedAt: 'desc'
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Articles</h1>
        <Link href="/admin/articles/new" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Add New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-600">No articles yet. Add your first article!</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Authors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Published</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {articles.map((article) => (
                <tr key={article.id}>
                  <td className="px-6 py-4">{article.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {article.authors.map(a => a.author.name).join(', ')}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    Vol.{article.issue.volume} No.{article.issue.issue} ({article.issue.year})
                  </td>
                  <td className="px-6 py-4 text-sm">{new Date(article.publishedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/articles/${article.id}`} className="text-blue-600 hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6">
        <Link href="/admin" className="text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
