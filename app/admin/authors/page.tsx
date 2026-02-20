import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function AuthorsPage() {
  const authors = await prisma.author.findMany({
    include: {
      _count: {
        select: { articles: true }
      }
    },
    orderBy: {
      name: 'asc'
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Authors</h1>
        <Link href="/admin/authors/new" className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
          Add New Author
        </Link>
      </div>

      {authors.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-600">No authors yet. Add your first author!</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Affiliation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Articles</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {authors.map((author) => (
                <tr key={author.id}>
                  <td className="px-6 py-4">{author.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{author.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{author.affiliation || '-'}</td>
                  <td className="px-6 py-4 text-sm">{author._count.articles}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/authors/${author.id}`} className="text-purple-600 hover:underline">
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
