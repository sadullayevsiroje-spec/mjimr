import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import EditArticleForm from './EditArticleForm'

export default async function EditArticlePage({
  params,
}: {
  params: { id: string }
}) {
  const [article, issues, authors] = await Promise.all([
    prisma.article.findUnique({
      where: { id: params.id },
      include: {
        authors: {
          include: { author: true },
          orderBy: { order: 'asc' }
        }
      }
    }),
    prisma.issue.findMany({
      orderBy: [
        { year: 'desc' },
        { volume: 'desc' },
        { issue: 'desc' }
      ]
    }),
    prisma.author.findMany({
      orderBy: { name: 'asc' }
    })
  ])

  if (!article) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Article</h1>
      <EditArticleForm 
        article={article} 
        issues={issues} 
        authors={authors} 
      />
    </div>
  )
}
