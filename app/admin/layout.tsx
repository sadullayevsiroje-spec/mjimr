import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

// TEMPORARY: Basic authentication check
// TODO: Replace with proper authentication system (NextAuth.js, Clerk, etc.)
async function checkAuth() {
  const headersList = headers()
  const authorization = headersList.get('authorization')
  
  // For now, we'll use a simple password check
  // In production, use proper authentication!
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'change-this-password'
  
  if (!authorization) {
    return false
  }
  
  const [scheme, credentials] = authorization.split(' ')
  
  if (scheme !== 'Basic') {
    return false
  }
  
  const decoded = Buffer.from(credentials, 'base64').toString()
  const [username, password] = decoded.split(':')
  
  return password === ADMIN_PASSWORD
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check authentication
  const isAuthenticated = await checkAuth()
  
  if (!isAuthenticated) {
    // Return 401 with WWW-Authenticate header to trigger browser login
    return (
      <html>
        <head>
          <meta httpEquiv="WWW-Authenticate" content='Basic realm="Admin Area"' />
        </head>
        <body>
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
              <h1 className="text-2xl font-bold text-red-600 mb-4">🔒 Access Denied</h1>
              <p className="text-gray-700 mb-4">
                This area is restricted to authorized administrators only.
              </p>
              <p className="text-sm text-gray-500">
                Please contact the system administrator if you need access.
              </p>
            </div>
          </div>
        </body>
      </html>
    )
  }

  return <>{children}</>
}
