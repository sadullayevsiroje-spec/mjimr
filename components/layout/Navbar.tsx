import Link from 'next/link'
import { journal } from '@/data/journal'

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-primary-600 to-primary-700 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-white hover:text-primary-100 transition-colors">
            {journal.shortName}
          </Link>
          
          <div className="hidden md:flex space-x-1 items-center">
            <Link href="/" className="text-white hover:bg-primary-500 px-3 py-2 rounded-lg transition-all">Home</Link>
            <Link href="/issues" className="text-white hover:bg-primary-500 px-3 py-2 rounded-lg transition-all">Current</Link>
            <Link href="/archive" className="text-white hover:bg-primary-500 px-3 py-2 rounded-lg transition-all">Archives</Link>
            <Link href="/about" className="text-white hover:bg-primary-500 px-3 py-2 rounded-lg transition-all">About</Link>
            <Link href="/editorial-board" className="text-white hover:bg-primary-500 px-3 py-2 rounded-lg transition-all">Editorial Board</Link>
            <Link href="/author-guidelines" className="text-white hover:bg-primary-500 px-3 py-2 rounded-lg transition-all">For Authors</Link>
            <Link href="/contact" className="text-white hover:bg-primary-500 px-3 py-2 rounded-lg transition-all">Contact</Link>
            <Link href="/search" className="bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600 transition-all ml-2 font-medium">Search</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
