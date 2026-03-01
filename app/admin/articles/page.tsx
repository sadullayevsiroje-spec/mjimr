import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import ArticlesList from './ArticlesList'

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

      <ArticlesList articles={articles} />

      <div className="mt-6">
        <Link href="/admin" className="text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
