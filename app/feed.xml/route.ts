import { prisma } from '@/lib/prisma'
import { journal } from '@/data/journal'

export async function GET() {
  const articles = await prisma.article.findMany({
    take: 20,
    orderBy: { publishedAt: 'desc' },
    include: {
      issue: true,
      authors: {
        include: { author: true },
        orderBy: { order: 'asc' }
      }
    }
  })

  const baseUrl = 'https://mjimr.vercel.app'

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${journal.name}</title>
    <link>${baseUrl}</link>
    <description>${journal.description}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${articles.map(article => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${baseUrl}/articles/${article.id}</link>
      <description>${escapeXml(article.abstract)}</description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}/articles/${article.id}</guid>
      <author>${article.authors.map(a => a.author.name).join(', ')}</author>
    </item>`).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case "'": return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}
