import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const authors = await prisma.author.findMany({
      orderBy: { name: 'asc' }
    })
    return NextResponse.json(authors)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch authors' }, { status: 500 })
  }
}
