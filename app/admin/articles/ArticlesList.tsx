'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Article = {
  id: string
  title: string
  publishedAt: Date
  issue: {
    year: number
    volume: number
    issue: number
  }
  authors: {
    author: {
      name: string
    }
  }[]
}

export default function ArticlesList({ articles }: { articles: Article[] }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" maqolasini o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi!`)) {
      return
    }

    setDeleting(id)
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Xatolik yuz berdi. Qaytadan urinib ko\'ring.')
      }
    } catch (error) {
      alert('Xatolik yuz berdi. Qaytadan urinib ko\'ring.')
    } finally {
      setDeleting(null)
    }
  }

  if (articles.length === 0) {
    return (
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <p className="text-gray-600">No articles yet. Add your first article!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Authors</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Published</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {articles.map((article) => (
            <tr key={article.id} className={deleting === article.id ? 'opacity-50' : ''}>
              <td className="px-6 py-4">{article.title}</td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {article.authors.map(a => a.author.name).join(', ')}
              </td>
              <td className="px-6 py-4 text-sm">
                Vol.{article.issue.volume} No.{article.issue.issue} ({article.issue.year})
              </td>
              <td className="px-6 py-4 text-sm">{new Date(article.publishedAt).toLocaleDateString()}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Link 
                    href={`/admin/articles/${article.id}/edit`} 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id, article.title)}
                    disabled={deleting === article.id}
                    className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
                  >
                    {deleting === article.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
