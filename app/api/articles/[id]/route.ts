import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Delete article (cascade will delete ArticleAuthor relations)
    await prisma.article.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const {
      title,
      abstract,
      content,
      keywords,
      pages,
      doi,
      pdfUrl,
      issueId,
      publishedAt,
      authorIds
    } = body

    // Update article
    await prisma.article.update({
      where: { id: params.id },
      data: {
        title,
        abstract,
        content,
        keywords: keywords || null,
        pages: pages || null,
        doi: doi || null,
        pdfUrl: pdfUrl || null,
        issueId,
        publishedAt: new Date(publishedAt)
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    )
  }
}
