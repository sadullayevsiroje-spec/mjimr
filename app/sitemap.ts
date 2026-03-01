import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mjimr.vercel.app'

  try {
    // Get all articles
    const articles = await prisma.article.findMany({
      select: {
        id: true,
        updatedAt: true,
      },
    })

    // Get all issues
    const issues = await prisma.issue.findMany({
      select: {
        year: true,
        volume: true,
        issue: true,
        createdAt: true,
      },
    })

    const articleUrls = articles.map((article) => ({
      url: `${baseUrl}/articles/${article.id}`,
      lastModified: article.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

    const issueUrls = issues.map((issue) => ({
      url: `${baseUrl}/issues/${issue.year}/${issue.volume}/${issue.issue}`,
      lastModified: issue.createdAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: `${baseUrl}/archive`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/editorial-board`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/author-guidelines`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.4,
      },
      {
        url: `${baseUrl}/policies`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/issues`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/search`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.6,
      },
      ...articleUrls,
      ...issueUrls,
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return basic sitemap if database is not available
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: `${baseUrl}/archive`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/editorial-board`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/author-guidelines`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.4,
      },
      {
        url: `${baseUrl}/policies`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/issues`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/search`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.6,
      },
    ]
  }
}
