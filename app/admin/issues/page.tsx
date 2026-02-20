import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany({
    include: {
      _count: {
        select: { articles: true }
      }
    },
    orderBy: [
      { year: 'desc' },
      { volume: 'desc' },
      { issue: 'desc' }
    ]
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Issues</h1>
        <Link href="/admin/issues/new" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Create New Issue
        </Link>
      </div>

      {issues.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-600">No issues yet. Create your first issue!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <div key={issue.id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">
                Vol. {issue.volume} No. {issue.issue}
              </h3>
              <p className="text-gray-600 mb-2">Year: {issue.year}</p>
              <p className="text-gray-600 mb-2">Published: {new Date(issue.published).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500 mb-4">{issue._count.articles} articles</p>
              <Link href={`/admin/issues/${issue.id}`} className="text-green-600 hover:underline">
                Edit Issue →
              </Link>
            </div>
          ))}
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
