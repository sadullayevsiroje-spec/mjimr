import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, abstract, content, keywords, pages, doi, issueId, authorIds, publishedAt, pdfUrl } = body

    if (!title || !abstract || !content || !issueId || !authorIds || authorIds.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const article = await prisma.article.create({
      data: {
        title,
        abstract,
        content,
        keywords: keywords || null,
        pages: pages || null,
        doi: doi || null,
        pdfUrl: pdfUrl || null,
        publishedAt: new Date(publishedAt),
        issueId,
        authors: {
          create: authorIds.map((authorId: string, index: number) => ({
            authorId,
            order: index + 1
          }))
        }
      },
      include: {
        issue: true,
        authors: {
          include: { author: true }
        }
      }
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}
