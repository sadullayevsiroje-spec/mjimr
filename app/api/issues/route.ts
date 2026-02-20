import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const issues = await prisma.issue.findMany({
      orderBy: [
        { year: 'desc' },
        { volume: 'desc' },
        { issue: 'desc' }
      ]
    })
    return NextResponse.json(issues)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch issues' }, { status: 500 })
  }
}
