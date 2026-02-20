import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, title, position, affiliation, email, bio, order, photoUrl } = body

    if (!name || !title || !position || !affiliation) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const member = await prisma.editorialBoard.create({
      data: {
        name,
        title,
        position,
        affiliation,
        email: email || null,
        bio: bio || null,
        order: order || 0,
        photoUrl: photoUrl || null
      }
    })

    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    console.error('Error creating editorial board member:', error)
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 })
  }
}
