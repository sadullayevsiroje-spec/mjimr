'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewArticlePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [issues, setIssues] = useState<any[]>([])
  const [authors, setAuthors] = useState<any[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/issues')
      .then(res => res.json())
      .then(data => setIssues(data))
    
    fetch('/api/authors')
      .then(res => res.json())
      .then(data => setAuthors(data))
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      abstract: formData.get('abstract'),
      content: formData.get('content'),
      keywords: formData.get('keywords'),
      pages: formData.get('pages'),
      doi: formData.get('doi'),
      issueId: formData.get('issueId'),
      authorIds: selectedAuthors,
      publishedAt: formData.get('publishedAt')
    }

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        router.push('/admin/articles')
      } else {
        alert('Error creating article')
      }
    } catch (error) {
      alert('Error creating article')
    } finally {
      setLoading(false)
    }
  }

  const toggleAuthor = (authorId: string) => {
    setSelectedAuthors(prev =>
      prev.includes(authorId)
        ? prev.filter(id => id !== authorId)
        : [...prev, authorId]
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Add New Article</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            name="title"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Abstract *</label>
          <textarea
            name="abstract"
            required
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Full Content *</label>
          <textarea
            name="content"
            required
            rows={12}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Keywords</label>
            <input
              type="text"
              name="keywords"
              placeholder="keyword1, keyword2, keyword3"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Pages</label>
            <input
              type="text"
              name="pages"
              placeholder="1-10"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">DOI</label>
            <input
              type="text"
              name="doi"
              placeholder="10.1234/mjimr.2026.01.001"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Published Date *</label>
            <input
              type="date"
              name="publishedAt"
              required
              defaultValue={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Issue *</label>
          <select
            name="issueId"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an issue</option>
            {issues.map(issue => (
              <option key={issue.id} value={issue.id}>
                Vol. {issue.volume} No. {issue.issue} ({issue.year})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Authors *</label>
          <div className="border rounded-lg p-4 max-h-48 overflow-y-auto">
            {authors.length === 0 ? (
              <p className="text-gray-500">No authors available. <Link href="/admin/authors/new" className="text-blue-600 hover:underline">Add authors first</Link></p>
            ) : (
              authors.map(author => (
                <label key={author.id} className="flex items-center py-2 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAuthors.includes(author.id)}
                    onChange={() => toggleAuthor(author.id)}
                    className="mr-3"
                  />
                  <span>{author.name} - {author.email}</span>
                </label>
              ))
            )}
          </div>
          {selectedAuthors.length === 0 && (
            <p className="text-red-500 text-sm mt-1">Please select at least one author</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || selectedAuthors.length === 0}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Creating...' : 'Create Article'}
          </button>
          <Link href="/admin/articles" className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
