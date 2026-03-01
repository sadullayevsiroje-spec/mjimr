import { journal } from '@/data/journal'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-primary-400">{journal.shortName}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{journal.description}</p>
            <div className="mt-4 flex items-center space-x-2">
              <span className="bg-secondary-500 text-white text-xs px-3 py-1 rounded-full font-semibold">Open Access</span>
              <span className="bg-primary-500 text-white text-xs px-3 py-1 rounded-full font-semibold">Peer Reviewed</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-primary-400 transition-colors">About Journal</a></li>
              <li><a href="/editorial-board" className="hover:text-primary-400 transition-colors">Editorial Board</a></li>
              <li><a href="/author-guidelines" className="hover:text-primary-400 transition-colors">Author Guidelines</a></li>
              <li><a href="/policies" className="hover:text-primary-400 transition-colors">Policies</a></li>
              <li><a href="/archive" className="hover:text-primary-400 transition-colors">Archives</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-lg">Contact</h3>
            <p className="text-sm text-gray-300 mb-2">
              <span className="text-primary-400">Email:</span><br/>
              {journal.email}
            </p>
            <p className="text-sm text-gray-300">
              <span className="text-primary-400">ISSN:</span><br/>
              {journal.issn}
            </p>
            <p className="text-sm text-gray-300 mt-2">
              <span className="text-primary-400">Frequency:</span><br/>
              {journal.frequency}
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} {journal.name}. All rights reserved.</p>
          <p className="mt-2">Published by {journal.publisher}</p>
        </div>
      </div>
    </footer>
  )
}
