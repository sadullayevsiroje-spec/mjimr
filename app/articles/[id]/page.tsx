import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { journal } from '@/data/journal'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const article = await prisma.article.findUnique({
    where: { id: params.id },
    include: {
      issue: true,
      authors: {
        include: { author: true },
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!article) {
    return {
      title: 'Article Not Found'
    }
  }

  const authors = article.authors.map(a => a.author.name).join(', ')

  return {
    title: `${article.title} | ${journal.shortName}`,
    description: article.abstract,
    authors: article.authors.map(a => ({ name: a.author.name })),
    alternates: {
      canonical: `https://mjimr.vercel.app/articles/${params.id}`,
    },
    openGraph: {
      title: article.title,
      description: article.abstract,
      type: 'article',
      publishedTime: article.publishedAt.toISOString(),
      authors: article.authors.map(a => a.author.name),
      url: `https://mjimr.vercel.app/articles/${params.id}`,
    },
    other: {
      // Google Scholar meta tags
      'citation_title': article.title,
      'citation_author': article.authors.map(a => a.author.name).join('; '),
      'citation_publication_date': article.publishedAt.toISOString().split('T')[0],
      'citation_journal_title': journal.name,
      'citation_volume': article.issue.volume.toString(),
      'citation_issue': article.issue.issue.toString(),
      'citation_firstpage': article.pages?.split('-')[0] || '',
      'citation_lastpage': article.pages?.split('-')[1] || '',
      'citation_doi': article.doi || '',
      // 'citation_issn': journal.issn, // Removed - will add when real ISSN is obtained
      'citation_language': 'en',
      'citation_abstract_html_url': `https://mjimr.vercel.app/articles/${article.id}`,
      'citation_pdf_url': `https://mjimr.vercel.app/articles/${article.id}/pdf`,
    }
  }
}

export default async function ArticlePage({
  params,
}: {
  params: { id: string }
}) {
  const article = await prisma.article.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      title: true,
      abstract: true,
      content: true,
      doi: true,
      pages: true,
      keywords: true,
      pdfUrl: true,
      publishedAt: true,
      issue: {
        select: {
          id: true,
          year: true,
          volume: true,
          issue: true,
          published: true,
        }
      },
      authors: {
        select: {
          id: true,
          order: true,
          author: {
            select: {
              id: true,
              name: true,
              affiliation: true,
            }
          }
        },
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!article) {
    notFound()
  }

  // JSON-LD structured data for Google Scholar
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": article.title,
    "abstract": article.abstract,
    "author": article.authors.map(a => ({
      "@type": "Person",
      "name": a.author.name,
      "affiliation": a.author.affiliation ? {
        "@type": "Organization",
        "name": a.author.affiliation
      } : undefined
    })),
    "datePublished": article.publishedAt.toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": journal.publisher
    },
    "isPartOf": {
      "@type": "PublicationIssue",
      "issueNumber": article.issue.issue.toString(),
      "isPartOf": {
        "@type": "PublicationVolume",
        "volumeNumber": article.issue.volume.toString(),
        "isPartOf": {
          "@type": "Periodical",
          "name": journal.name,
          // "issn": journal.issn // Removed - will add when real ISSN is obtained
        }
      }
    },
    "pageStart": article.pages?.split('-')[0],
    "pageEnd": article.pages?.split('-')[1],
    "identifier": article.doi ? {
      "@type": "PropertyValue",
      "propertyID": "DOI",
      "value": article.doi
    } : undefined,
    "url": `https://mjimr.vercel.app/articles/${article.id}`,
    "inLanguage": "en"
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <Link href="/search" className="text-blue-600 hover:underline text-sm">
            ← Back to search
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        
        <div className="mb-6 pb-6 border-b">
          <div className="text-gray-700 mb-2">
            {article.authors.map((a, i) => (
              <span key={a.id}>
                {a.author.name}
                {a.author.affiliation && <sup className="text-xs">{i + 1}</sup>}
                {i < article.authors.length - 1 && ', '}
              </span>
            ))}
          </div>
          
          {article.authors.some(a => a.author.affiliation) && (
            <div className="text-sm text-gray-600 mt-3">
              {article.authors.map((a, i) => 
                a.author.affiliation && (
                  <div key={a.id}>
                    <sup>{i + 1}</sup> {a.author.affiliation}
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <div className="mb-6 text-sm text-gray-600">
          <p>Vol. {article.issue.volume} No. {article.issue.issue} ({article.issue.year})</p>
          {article.pages && <p>Pages: {article.pages}</p>}
          {article.doi && <p>DOI: {article.doi}</p>}
          <p>Published: {new Date(article.publishedAt).toLocaleDateString()}</p>
        </div>

        {article.keywords && (
          <div className="mb-6">
            <h3 className="font-bold mb-2">Keywords:</h3>
            <p className="text-gray-700">{article.keywords}</p>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">Abstract</h2>
          <p className="text-gray-700 leading-relaxed">{article.abstract}</p>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-xl font-bold mb-3">Full Text</h2>
          
          {article.pdfUrl && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <a 
                href={article.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </a>
            </div>
          )}
          
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>
        </div>
      </article>
    </div>
  )
}
