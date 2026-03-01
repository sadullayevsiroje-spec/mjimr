'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminDashboard({ stats }: { stats: number[] }) {
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)
  const [articleCount, authorCount, issueCount, boardCount] = stats

  const handleLogout = async () => {
    if (!confirm('Chiqishni xohlaysizmi?')) return
    
    setLoggingOut(true)
    try {
      await fetch('/api/admin-logout', { method: 'POST' })
      router.push('/admin-login')
    } catch (error) {
      alert('Xatolik yuz berdi')
      setLoggingOut(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {loggingOut ? 'Chiqilmoqda...' : 'Chiqish'}
        </button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Total Articles</h3>
          <p className="text-3xl font-bold">{articleCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Total Authors</h3>
          <p className="text-3xl font-bold">{authorCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Total Issues</h3>
          <p className="text-3xl font-bold">{issueCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Editorial Board</h3>
          <p className="text-3xl font-bold">{boardCount}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/admin/articles" className="bg-blue-600 text-white p-6 rounded-lg shadow hover:bg-blue-700">
          <h3 className="text-xl font-bold mb-2">Manage Articles</h3>
          <p>Add, edit, or delete articles</p>
        </Link>
        <Link href="/admin/issues" className="bg-green-600 text-white p-6 rounded-lg shadow hover:bg-green-700">
          <h3 className="text-xl font-bold mb-2">Manage Issues</h3>
          <p>Create and manage journal issues</p>
        </Link>
        <Link href="/admin/authors" className="bg-purple-600 text-white p-6 rounded-lg shadow hover:bg-purple-700">
          <h3 className="text-xl font-bold mb-2">Manage Authors</h3>
          <p>View and edit author information</p>
        </Link>
        <Link href="/admin/editorial-board" className="bg-orange-600 text-white p-6 rounded-lg shadow hover:bg-orange-700">
          <h3 className="text-xl font-bold mb-2">Editorial Board</h3>
          <p>Manage editorial board members</p>
        </Link>
        <Link href="/" className="bg-gray-600 text-white p-6 rounded-lg shadow hover:bg-gray-700">
          <h3 className="text-xl font-bold mb-2">View Site</h3>
          <p>Go to public website</p>
        </Link>
      </div>
    </div>
  )
}
