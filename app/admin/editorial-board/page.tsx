import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'

export default async function EditorialBoardAdminPage() {
  const members = await prisma.editorialBoard.findMany({
    orderBy: { order: 'asc' }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Editorial Board</h1>
        <Link href="/admin/editorial-board/new" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Add Member
        </Link>
      </div>

      {members.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-600">No editorial board members yet. Add your first member!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow p-6">
              {member.photoUrl && (
                <div className="mb-4">
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="rounded-full mx-auto object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl font-bold text-center mb-2">{member.name}</h3>
              <p className="text-blue-600 text-center font-medium mb-1">{member.title}</p>
              <p className="text-gray-600 text-center text-sm mb-2">{member.position}</p>
              <p className="text-gray-500 text-center text-sm mb-4">{member.affiliation}</p>
              <div className="flex gap-2 justify-center">
                <Link href={`/admin/editorial-board/${member.id}`} className="text-blue-600 hover:underline text-sm">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Link href="/admin" className="text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
