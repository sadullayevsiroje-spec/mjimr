import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Archives',
  description: 'Browse all published issues and volumes of our medical journal. Access peer-reviewed research articles from our complete archive.',
  alternates: {
    canonical: 'https://mjimr.vercel.app/archive',
  },
}

export default async function ArchivePage() {
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

  // Group by year
  const issuesByYear = issues.reduce((acc, issue) => {
    if (!acc[issue.year]) {
      acc[issue.year] = []
    }
    acc[issue.year].push(issue)
    return acc
  }, {} as Record<number, typeof issues>)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Archives</h1>

      {Object.keys(issuesByYear).length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-600">No issues published yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(issuesByYear)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([year, yearIssues]) => (
              <div key={year} className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">{year}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {yearIssues.map((issue) => (
                    <Link
                      key={issue.id}
                      href={`/issues/${issue.year}/${issue.volume}/${issue.issue}`}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg text-blue-600">
                          Vol. {issue.volume} No. {issue.issue}
                        </h3>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          Open Access
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {new Date(issue.published).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </p>
                      <p className="text-sm text-gray-500">
                        {issue._count.articles} article{issue._count.articles !== 1 ? 's' : ''}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
