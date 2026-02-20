'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewEditorialBoardMemberPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Upload photo first if exists
      let photoUrl = null
      if (photoFile) {
        setUploading(true)
        const uploadFormData = new FormData()
        uploadFormData.append('file', photoFile)
        
        const uploadRes = await fetch('/api/upload-image', {
          method: 'POST',
          body: uploadFormData
        })
        
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json()
          photoUrl = uploadData.url
        }
        setUploading(false)
      }

      const formData = new FormData(e.currentTarget)
      const data = {
        name: formData.get('name'),
        title: formData.get('title'),
        position: formData.get('position'),
        affiliation: formData.get('affiliation'),
        email: formData.get('email'),
        bio: formData.get('bio'),
        order: parseInt(formData.get('order') as string) || 0,
        photoUrl
      }

      const res = await fetch('/api/editorial-board', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        router.push('/admin/editorial-board')
      } else {
        alert('Error creating member')
      }
    } catch (error) {
      alert('Error creating member')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Add Editorial Board Member</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name *</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Dr. John Smith"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            name="title"
            required
            placeholder="MD, PhD"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Position *</label>
          <select
            name="position"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select position</option>
            <option value="Editor-in-Chief">Editor-in-Chief</option>
            <option value="Associate Editor">Associate Editor</option>
            <option value="Editorial Board Member">Editorial Board Member</option>
            <option value="Managing Editor">Managing Editor</option>
            <option value="Section Editor">Section Editor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Affiliation *</label>
          <input
            type="text"
            name="affiliation"
            required
            placeholder="Harvard Medical School, USA"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="john.smith@example.com"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {photoFile && (
            <p className="text-sm text-gray-600 mt-1">Selected: {photoFile.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            name="bio"
            rows={4}
            placeholder="Brief biography..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Display Order</label>
          <input
            type="number"
            name="order"
            defaultValue={0}
            placeholder="0"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || uploading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {uploading ? 'Uploading Photo...' : loading ? 'Creating...' : 'Create Member'}
          </button>
          <Link href="/admin/editorial-board" className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
