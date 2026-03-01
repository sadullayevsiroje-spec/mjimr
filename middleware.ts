import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Allow access to admin-login page without authentication
  if (pathname === '/admin-login') {
    return NextResponse.next()
  }
  
  // Protect all admin routes
  if (pathname.startsWith('/admin')) {
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
  matcher: ['/admin/:path*', '/admin-login'],
}
