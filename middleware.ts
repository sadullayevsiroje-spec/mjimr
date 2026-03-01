import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Protect admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin-login') {
    // Check if user is authenticated
    const adminToken = request.cookies.get('admin_authenticated')
    
    if (!adminToken || adminToken.value !== 'true') {
      // Redirect to login page
      return NextResponse.redirect(new URL('/admin-login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
