'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Article = {
  id: string
  title: string
  abstract: string
  content: string
  keywords: string | null
  pages: string | null
  doi: string | null
  pdfUrl: string | null
  publishedAt: Date
  issueId: string
  authors: {
    author: {
      id: string
      name: string
    }
  }[]
}

type Issue = {
  id: string
  year: number
  volume: number
  issue: number
}

type Author = {
  id: string
  name: string
}

export default function EditArticleForm({
  article,
  issues,
  authors
}: {
  article: Article
  issues: Issue[]
  authors: Author[]
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: article.title,
    abstract: article.abstract,
    content: article.content,
    keywords: article.keywords || '',
    pages: article.pages || '',
    doi: article.doi || '',
    pdfUrl: article.pdfUrl || '',
    issueId: article.issueId,
    publishedAt: new Date(article.publishedAt).toISOString().split('T')[0],
    authorIds: article.authors.map(a => a.author.id)
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/articles/${article.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/admin/articles')
      } else {
        alert('Xatolik yuz berdi')
      }
    } catch (error) {
      alert('Xatolik yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl bg-white p-8 rounded-lg shadow">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Abstract *</label>
          <textarea
            value={formData.abstract}
            onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
            className="w-full px-4 py-2 border rounded h-32"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Full Text *</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2 border rounded h-64"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Keywords</label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Pages</label>
            <input
              type="text"
              value={formData.pages}
              onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              placeholder="1-10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">DOI</label>
            <input
              type="text"
              value={formData.doi}
              onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              placeholder="10.1234/example"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">PDF URL</label>
            <input
              type="text"
              value={formData.pdfUrl}
              onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              placeholder="/pdfs/article.pdf"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Issue *</label>
            <select
              value={formData.issueId}
              onChange={(e) => setFormData({ ...formData, issueId: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            >
              {issues.map(issue => (
                <option key={issue.id} value={issue.id}>
                  Vol.{issue.volume} No.{issue.issue} ({issue.year})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Published Date *</label>
            <input
              type="date"
              value={formData.publishedAt}
              onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <Link
            href="/admin/articles"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  )
}
