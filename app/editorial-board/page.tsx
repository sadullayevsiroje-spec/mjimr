import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editorial Board',
  description: 'Meet our distinguished editorial board members - leading experts in medical and health sciences who guide our peer-review process.',
  alternates: {
    canonical: 'https://mjimr.vercel.app/editorial-board',
  },
}

export default async function EditorialBoardPage() {
  const members = await prisma.editorialBoard.findMany({
    orderBy: { order: 'asc' }
  })

  // Group by position
  const groupedMembers = members.reduce((acc, member) => {
    if (!acc[member.position]) {
      acc[member.position] = []
    }
    acc[member.position].push(member)
    return acc
  }, {} as Record<string, typeof members>)

  const positionOrder = [
    'Editor-in-Chief',
    'Associate Editor',
    'Managing Editor',
    'Section Editor',
    'Editorial Board Member'
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Editorial Board</h1>
      
      {members.length === 0 ? (
        <div className="bg-blue-50 p-8 rounded-lg">
          <p className="text-gray-700">
            <strong>Note:</strong> Editorial board members will be added as the journal develops.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {positionOrder.map(position => {
            const positionMembers = groupedMembers[position]
            if (!positionMembers || positionMembers.length === 0) return null

            return (
              <div key={position}>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-blue-600 pb-2">
                  {position}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {positionMembers.map((member) => (
                    <div key={member.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                      {member.photoUrl && (
                        <div className="mb-4">
                          <Image
                            src={member.photoUrl}
                            alt={member.name}
                            width={150}
                            height={150}
                            className="rounded-full mx-auto object-cover border-4 border-blue-100"
                          />
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-center mb-1">{member.name}</h3>
                      <p className="text-blue-600 text-center font-medium mb-2">{member.title}</p>
                      <p className="text-gray-600 text-center text-sm mb-3">{member.affiliation}</p>
                      {member.email && (
                        <p className="text-gray-500 text-center text-sm mb-3">
                          <a href={`mailto:${member.email}`} className="hover:text-blue-600">
                            {member.email}
                          </a>
                        </p>
                      )}
                      {member.bio && (
                        <p className="text-gray-700 text-sm mt-4 pt-4 border-t">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
