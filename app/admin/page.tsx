import { prisma } from '@/lib/prisma'
import AdminDashboard from './AdminDashboard'

export default async function AdminPage() {
  const stats = await Promise.all([
    prisma.article.count(),
    prisma.author.count(),
    prisma.issue.count(),
    prisma.editorialBoard.count(),
  ])

  return <AdminDashboard stats={stats} />
}
