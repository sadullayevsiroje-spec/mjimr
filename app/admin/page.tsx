import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function AdminDashboard() {
  const stats = await Promise.all([
    prisma.article.count(),
    prisma.author.count(),
    prisma.issue.count(),
  ])

  const [articleCount, authorCount, issueCount] = stats

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Total Articles</h3>
          <p className="text-3xl font-bold">{articleCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Total Authors</h3>
          <p className="text-3xl font-bold">{authorCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Total Issues</h3>
          <p className="text-3xl font-bold">{issueCount}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/admin/articles" className="bg-blue-600 text-white p-6 rounded-lg shadow hover:bg-blue-700">
          <h3 className="text-xl font-bold mb-2">Manage Articles</h3>
          <p>Add, edit, or delete articles</p>
        </Link>
        <Link href="/admin/issues" className="bg-green-600 text-white p-6 rounded-lg shadow hover:bg-green-700">
          <h3 className="text-xl font-bold mb-2">Manage Issues</h3>
          <p>Create and manage journal issues</p>
        </Link>
        <Link href="/admin/authors" className="bg-purple-600 text-white p-6 rounded-lg shadow hover:bg-purple-700">
          <h3 className="text-xl font-bold mb-2">Manage Authors</h3>
          <p>View and edit author information</p>
        </Link>
        <Link href="/" className="bg-gray-600 text-white p-6 rounded-lg shadow hover:bg-gray-700">
          <h3 className="text-xl font-bold mb-2">View Site</h3>
          <p>Go to public website</p>
        </Link>
      </div>
    </div>
  )
}
